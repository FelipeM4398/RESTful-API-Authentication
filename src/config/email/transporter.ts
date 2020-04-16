import nodemailer from 'nodemailer';
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
  port: Number(process.env.EMAIL_PORT) || 2525,
  auth: {
    user: process.env.EMAIL_USER || '52216d078f5bfd',
    pass: process.env.EMAIL_PASS || '88121f763a8479',
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'src/utils/emails/templates',
      layoutsDir: 'src/utils/emails/templates',
      defaultLayout: '',
    },
    viewPath: 'src/utils/emails/templates',
  })
);

export default transporter;
