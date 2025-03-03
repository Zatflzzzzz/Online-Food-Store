import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {PrismaClient} from '@prisma/client';
import {HTTP_BAD_REQUEST} from '../constants/http.status';

const router = Router();
const prisma = new PrismaClient();

// Получение всех блюд
router.get("/", asyncHandler(async (req, res) => {
    const foods = await prisma.food.findMany();
    res.send(foods);
}));

// Поиск блюд по названию
router.get("/search/:searchTerm", asyncHandler(async (req, res) => {
    const searchTerm = req.params.searchTerm;

    const foods = await prisma.food.findMany({
        where: {
            name: { contains: searchTerm, mode: 'insensitive' },
        },
    });

    res.send(foods);
}));

// Получение всех тегов
router.get("/tags", asyncHandler(async (req, res) => {
    const tags = await prisma.food.groupBy({
        by: ['tags'],
        _count: {
            tags: true,
        },
    });

    const all = {
        name: 'All',
        count: await prisma.food.count(),
    };

    const formattedTags = tags.map(tag => ({
        name: tag.tags[0], // Предполагаем, что tags - это массив
        count: tag._count.tags,
    }));

    formattedTags.unshift(all);
    res.send(formattedTags);
}));

// Получение блюд по тегу
router.get("/tag/:tagName", asyncHandler(async (req, res) => {
    const tagName = req.params.tagName;

    const foods = await prisma.food.findMany({
        where: {
            tags: { has: tagName },
        },
    });

    res.send(foods);
}));

// Получение блюда по ID
router.get("/:foodId", asyncHandler(async (req, res) => {
    const foodId = req.params.foodId;

    const food = await prisma.food.findUnique({
        where: { id: foodId },
    });

    if (!food) {
        res.status(HTTP_BAD_REQUEST).send("Food not found");
        return;
    }

    res.send(food);
}));

// Добавление нового блюда
router.post("/addDish", asyncHandler(async (req, res) => {
    const { name, price, tags, favorite, stars, imageUrl, origins, cookTime } = req.body;

    const existingDish = await prisma.food.findFirst({ where: { name } });

    if (existingDish) {
        res.status(HTTP_BAD_REQUEST).send('This dish is already on the menu');
        return;
    }

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

// Редактирование данных блюда
router.put("/editFoodData/:id", asyncHandler(async (req, res) => {
    const foodId = req.params.id;
    const foodData = req.body;

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

    const deletedFood = await prisma.food.delete({ where: { id: foodId } });

    if (!deletedFood) {
        res.status(HTTP_BAD_REQUEST).send("Food is not found");
        return;
    }

    res.send();
}));

export default router;