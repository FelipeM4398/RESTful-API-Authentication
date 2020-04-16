import { Request, NextFunction, Response } from 'express';
import User from '../models/User';
import { validateBodyForCreate } from '../utils/validations/user.validation';
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/emails/sendVerificationEmail';
import { EMAIL_TOKEN_EXPIRE } from '../utils/constants';

/**
 * Registra un nuevo usuario
 * @param req
 * @param res
 * @param next
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    await validateBodyForCreate(req);

    // crea la fecha en la que expira el token para verificar el email
    const emailExpires = new Date();
    emailExpires.setSeconds(emailExpires.getSeconds() + EMAIL_TOKEN_EXPIRE);

    const user = await User.query()
      .skipUndefined()
      .insert({
        identification: req.body.identification,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        emailVerificationToken: crypto.randomBytes(20).toString('hex'),
        emailVerificationExpires: emailExpires,
      });
    await user.$relatedQuery('roles').relate(2);

    sendVerificationEmail(user, req);

    res.status(201).send();
  } catch (err) {
    next(err);
  }
}
