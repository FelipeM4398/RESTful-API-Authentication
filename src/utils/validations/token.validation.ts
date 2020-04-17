import { Request } from 'express';
import User from '../../models/User';
import MyError from '../errors/MyError';
import { errorCodes, messages } from '../constants';

/**
 * Valida el token de verificación de email
 * @param req
 * @returns Promise<User>
 */
export async function validateEmailToken(req: Request): Promise<User> {
  const token = req.params.token;

  // busca un usuario por medio del token y que no haya exprirado
  const user = await User.query()
    .findOne('email_verification_token', token)
    .where('email_verification_expires', '>', new Date());

  if (!user) {
    throw new MyError(
      errorCodes.tokenInvalid,
      messages().tokenInvalidOrExpired,
      400
    );
  }

  return user;
}
