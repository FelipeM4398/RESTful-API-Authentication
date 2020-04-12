import { Router } from 'express';
import { signup } from '../controllers/auth.controller';

const authRouter = Router();

// se asignan los controladores a las rutas
authRouter.post('/signup', signup);

export default authRouter;
