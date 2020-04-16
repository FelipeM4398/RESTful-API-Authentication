import { Router } from 'express';
import { signup, verify } from '../controllers/auth.controller';

const authRouter = Router();

// se asignan los controladores a las rutas
authRouter.post('/signup', signup);
authRouter.get('/verify/:token', verify);

export default authRouter;
