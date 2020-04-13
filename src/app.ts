import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import knex from './config/db/knex';
import { Model } from 'objection';
import MyError from './utils/MyError';
import errorHandler from './middlewares/errorHandler';
import { endpoints } from './utils/constants';
import authRouter from './routes/authRouter';

/**
 * Initializations
 */
const app = express();
Model.knex(knex);

/**
 * Settings
 */
app.set('port', process.env.PORT || 3000);

/**
 * Middlewares
 */
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Routes
 */
app.use(endpoints.auth, authRouter);

//if the request is not captured by the previous routes a NotFound Error is created
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new MyError('NotFound', 'Resource not found', 404);
  next(err);
});
app.use(errorHandler);

export default app;
