import { Request, NextFunction, Response } from 'express';
import User from '../models/User';
import { validateBodyForCreate } from '../utils/validations/user.validation';

/**
 * Registra un nuevo usuario
 * @param req
 * @param res
 * @param next
 */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    // valida los atributos enviados en la petición
    await validateBodyForCreate(req);

    // crea el usuario en la base de datos
    const user = await User.query().insert(req.body);
    await user.$relatedQuery('roles').relate(2);

    // envia respuesta exitosa
    res.status(201).send({ message: 'user created' });
  } catch (err) {
    // si ocurre un error lo pasa al error handler
    next(err);
  }
}
