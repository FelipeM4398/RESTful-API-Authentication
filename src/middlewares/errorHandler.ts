import { NextFunction, Response, Request } from 'express';

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
  res.status(err.status).json({
    path: req.path,
    status: err.status,
    code: err.code,
    message: err.message,
  });
}
