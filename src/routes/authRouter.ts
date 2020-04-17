import { Router } from 'express';
import { signup, verify, login } from '../controllers/auth.controller';

const authRouter = Router();

// se asignan los controladores a las rutas
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/verify/:token', verify);

export default authRouter;
