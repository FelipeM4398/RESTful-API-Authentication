import transporter from '../../config/email/transporter';
import { Request } from 'express';
import User from '../../models/User';
import { endpoints } from '../constants';

export async function sendVerificationEmail(user: User, req: Request) {
  const link = `${req.protocol}://${req.hostname}:3000${endpoints.auth}/verify/${user.emailVerificationToken}`;
  const options = {
    from: '"Auth API" <no-replay@auth.com>',
    to: user.email,
    template: 'verification',
    subject: '¡Bienvenido! Confirma Tu Email',
    text: 'Validación de correo electrónico',
    context: {
      link,
      name: user.name,
    },
  };
  await transporter.sendMail(options);
}
