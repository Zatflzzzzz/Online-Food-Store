import dotenv from 'dotenv';
dotenv.config();


import {Router} from 'express';
//import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http.status';
import bcrypt from 'bcryptjs'

const router = Router();

// router.get("/seed", asyncHandler(
//   async (req, res) => {
//      const usersCount = await UserModel.countDocuments();
//      if(usersCount> 0){
//        res.send("Seed is already done!");
//        return;
//      }

//      await UserModel.create(sample_users);
//      res.send("Seed Is Done!");
//  }
// ))

const generateTokenReponse = (user : User) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign({
    id:user.id,email:user.email, isAdmin: user.isAdmin
  },secretKey,{
    expiresIn:"30d"
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
    balance:user.balance
  };
}

router.post('/register', asyncHandler(async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    
    if(user){
      res.status(HTTP_BAD_REQUEST).send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      balance: 0
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  }
))

router.post("/login", asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email});

  if(!user){
    res.status(HTTP_BAD_REQUEST).send("Username not found");
    return;  // Stop further execution
  }
    
  if((await bcrypt.compare(password, user.password)) || user?.password == password) {
    res.send(generateTokenReponse(user));
    return;  // Stop further execution
  }
  
  res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
}));


router.get("/getUserById/:userId", asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.userId);

  if(!user){
    res.status(HTTP_BAD_REQUEST).send("User with this ID is not found");
    return; // Ensure to stop execution if user is not found
  }

  res.send(user);
}));

router.get("/getAll", asyncHandler(async (req, res) => {
  const users = await UserModel.find(); // Получаем обновленный список пользователей
  res.send(users);
}));

router.get("/searchUsers/:searchTerm", asyncHandler(async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, 'i');
  const users = await UserModel.find({ name: { $regex: searchRegex } });

  res.send(users);
}));

export default router;