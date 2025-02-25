import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Food, FoodModel } from '../models/food.model';
import { HTTP_BAD_REQUEST } from '../constants/http.status';
import { UserModel } from '../models/user.model';

const router = Router();

router.post("/addDish", asyncHandler(async (req:any,res) => {
    const {name, price, tags, favorite, stars, imageUrl, origins, cookTime} = req.body;

    const dish = await FoodModel.findOne({name});

    if(dish){
        res.status(HTTP_BAD_REQUEST).send('This dish is already on the menu');
        return;
    }

    const newDish: Food = {
        id:"",
        name,
        price,
        tags,
        favorite,
        stars,
        imageUrl,
        origins,
        cookTime,
    }

    await FoodModel.create(newDish);
    res.send();
}))

router.put("/editDataUser/:id", asyncHandler(async (req:any,res) => {
    const userId = req.params.id;
    const updateData = req.body

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {new:false})

    if(!user){
        res.status(HTTP_BAD_REQUEST).send("Sorry, an unexpected error has occurred")
        return
    }

    res.send(user);
}))

router.put("/editFoodData/:id" ,asyncHandler(async (req:any,res) => {
    const foodId = req.params.id;
    const foodData = req.body

    const food = await FoodModel.findByIdAndUpdate(foodId, foodData, {new:false})

    if(!food){
        res.status(HTTP_BAD_REQUEST).send("Dish is not found")
        return
    }

    res.send();
}))

router.delete("/deleteFood/:id",asyncHandler(async (req:any,res) => {
    const foodId = req.params.id;

    const food = await FoodModel.findByIdAndDelete(foodId);

    if(!food){
        res.status(HTTP_BAD_REQUEST).send("Food is not found")
        return
    }

    res.send();
}))

router.delete("/deleteUserData/:id", asyncHandler(async (req:any,res) => {
    const userId = req.params.id;

    const user = await UserModel.findByIdAndDelete(userId);

    if(!user){
        res.status(HTTP_BAD_REQUEST).send("User is not found")
        return
    }

    res.send();
}))

export default router;