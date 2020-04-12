import { NextFunction, Response, Request } from 'express';
import { messages, errorCodes } from '../utils/constants';

/**
 * Captura los errores y envia una respuesta notificando del error
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(err.status || 500).json({
    path: req.path,
    status: err.status || 500,
    code: err.code || err.type || 'UnknownError',
    message: err.message || 'Unknown Error',
  });
}
