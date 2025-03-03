import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {PrismaClient} from '@prisma/client';
import {HTTP_BAD_REQUEST} from '../constants/http.status';

const router = Router();
const prisma = new PrismaClient();

// Добавление нового блюда
router.post("/addDish", asyncHandler(async (req, res) => {
    const { name, price, tags, favorite, stars, imageUrl, origins, cookTime } = req.body;

    // Проверяем, существует ли блюдо с таким именем
    const existingDish = await prisma.food.findFirst({ where: { name } });

    if (existingDish) {
        res.status(HTTP_BAD_REQUEST).send('This dish is already on the menu');
        return;
    }

    // Создаем новое блюдо
    const newDish = await prisma.food.create({
        data: {
            name,
            price,
            tags,
            favorite,
            stars,
            imageUrl,
            origins,
            cookTime,
        },
    });

    res.send(newDish);
}));

// Редактирование данных пользователя
router.put("/editDataUser/:id", asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    // Обновляем данные пользователя
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
    });

    if (!updatedUser) {
        res.status(HTTP_BAD_REQUEST).send("Sorry, an unexpected error has occurred");
        return;
    }

    res.send(updatedUser);
}));

// Редактирование данных блюда
router.put("/editFoodData/:id", asyncHandler(async (req, res) => {
    const foodId = req.params.id;
    const foodData = req.body;

    // Обновляем данные блюда
    const updatedFood = await prisma.food.update({
        where: { id: foodId },
        data: foodData,
    });

    if (!updatedFood) {
        res.status(HTTP_BAD_REQUEST).send("Dish is not found");
        return;
    }

    res.send(updatedFood);
}));

// Удаление блюда
router.delete("/deleteFood/:id", asyncHandler(async (req, res) => {
    const foodId = req.params.id;

    // Удаляем блюдо
    const deletedFood = await prisma.food.delete({ where: { id: foodId } });

    if (!deletedFood) {
        res.status(HTTP_BAD_REQUEST).send("Food is not found");
        return;
    }

    res.send();
}));

// Удаление пользователя
router.delete("/deleteUserData/:id", asyncHandler(async (req, res) => {
    const userId = req.params.id;

    // Удаляем пользователя
    const deletedUser = await prisma.user.delete({ where: { id: userId } });

    if (!deletedUser) {
        res.status(HTTP_BAD_REQUEST).send("User is not found");
        return;
    }

    res.send();
}));

export default router;