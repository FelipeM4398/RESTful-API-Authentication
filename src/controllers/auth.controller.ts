import { sendVerificationEmail } from '../utils/emails/sendVerificationEmail';
import { validateEmailToken } from '../utils/validations/token.validation';
import {
  EMAIL_TOKEN_EXPIRE,
  JWT_SECRET,
  JWT_TOKEN_EXPIRE,
} from '../utils/constants';
import { Request, NextFunction, Response } from 'express';
import {
  validateBody,
  validateCredentials,
} from '../utils/validations/user.validation';
import knex from '../config/db/knex';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Registra un nuevo usuario
 * @param req
 * @param res
 * @param next
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    await validateBody(req);

    // crea la fecha en la que expira el token para verificar el email
    const emailExpires = new Date();
    emailExpires.setSeconds(emailExpires.getSeconds() + EMAIL_TOKEN_EXPIRE);

    const user = await User.query().insert({
      identification: req.body.identification,
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      emailVerificationToken: crypto.randomBytes(20).toString('hex'),
      emailVerificationExpires: emailExpires,
    });
    // se asigna el rol usuario por defecto
    await user.$relatedQuery('roles').relate(2);

    sendVerificationEmail(user, req);

    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

/**
 * Verifica un usuario
 * @param req
 * @param res
 * @param next
 */
export async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await validateEmailToken(req);

    await user.$query().patch({
      verified: true,
      emailVerificationToken: knex.raw('NULL'),
      emailVerificationExpires: knex.raw('NULL'),
    });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

/**
 * Retorna un JWT Token si el usuario se loguea con éxito
 * @param req
 * @param res
 * @param next
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await validateCredentials(req);

    // crea el token con el id y email del usuario
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_TOKEN_EXPIRE,
    });

    res.status(200).send({
      type: 'Bearer',
      access_token: token,
      expiresIn: JWT_TOKEN_EXPIRE,
    });
  } catch (error) {
    next(error);
  }
}
