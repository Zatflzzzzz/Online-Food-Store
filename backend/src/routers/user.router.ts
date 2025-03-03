import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {PrismaClient} from '@prisma/client';
import {HTTP_BAD_REQUEST} from '../constants/http.status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const prisma = new PrismaClient();

// Регистрация пользователя
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    res.status(HTTP_BAD_REQUEST).send('User already exists, please login!');
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      balance: 0,
    },
  });

  res.send(generateTokenResponse(newUser));
}));

// Логин пользователя
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
    return;
  }

  res.send(generateTokenResponse(user));
}));

// Получение пользователя по ID
router.get("/getUserById/:userId", asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    res.status(HTTP_BAD_REQUEST).send("User not found");
    return;
  }

  res.send(user);
}));

// Получение всех пользователей
router.get("/getAll", asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
}));

// Поиск пользователей по имени
router.get("/searchUsers/:searchTerm", asyncHandler(async (req, res) => {
  const searchTerm = req.params.searchTerm;

  const users = await prisma.user.findMany({
    where: {
      name: { contains: searchTerm, mode: 'insensitive' },
    },
  });

  res.send(users);
}));

// Редактирование данных пользователя
router.put("/editDataUser/:id", asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  if (!updatedUser) {
    res.status(HTTP_BAD_REQUEST).send("User not found");
    return;
  }

  res.send(updatedUser);
}));

// Удаление пользователя
router.delete("/deleteUserData/:id", asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const deletedUser = await prisma.user.delete({ where: { id: userId } });

  if (!deletedUser) {
    res.status(HTTP_BAD_REQUEST).send("User is not found");
    return;
  }

  res.send();
}));

// Генерация JWT токена
const generateTokenResponse = (user: any) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      secretKey,
      { expiresIn: '30d' }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
    balance: user.balance,
  };
};

export default router;