import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {tokens_email} from "../data";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

const router = Router();

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASWWORD
  }
});

const generateToken = (): string => {
  return crypto.randomBytes(20).toString('hex');
};

export const sendConfirmationEmail = async (userEmail: string): Promise<string> => {
  const token = generateToken();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Подтверждение почты',
    html: `
      <p>Нажмите на кнопку ниже, чтобы подтвердить свою почту:</p>
      <a href="http://localhost:5000/confirm-email?token=${token}" style="padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Подтвердить почту</a>
    `
  };

  await transporter.sendMail(mailOptions);
  return token;
};

router.get('/send-email', asyncHandler(async (req, res) => {
    const userEmail = 'timofeysangjey@gmail.com';
    try {
      const token = await sendConfirmationEmail(userEmail);
    
      tokens_email[token] = false

      res.send('Письмо отправлено');
    } catch (error) {
      res.status(500).send(error);
    }
}));
  
router.get('/confirm-email', asyncHandler((req:any, res:any) => {
    const { token } = req.query;
    
    if (!token || typeof token !== 'string' || !tokens_email.hasOwnProperty(token)) {
        return res.status(400).send('Неверный или истекший токен');
    }
    
    tokens_email[token] = true
    res.send('Почта успешно подтверждена!');
}));

export default router