import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import {PrismaClient} from '@prisma/client';
import {HTTP_BAD_REQUEST} from '../constants/http.status';
import {OrderStatus} from '../constants/order.status';
import auth from '../middlewares/auth.mid';

const router = Router();
const prisma = new PrismaClient();
router.use(auth);

// Создание заказа
router.post("/createOrder", asyncHandler(async (req: any, res) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    const order = await prisma.order.create({
        data: {
            ...requestOrder,
            userId: req.user.id,
            status: OrderStatus.NEW,
        },
    });

    res.send(order);
}));

// Получение заказа по ID
router.get('/orderForUser/:orderId', asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { user: true },
    });

    if (!order) {
        res.status(HTTP_BAD_REQUEST).send("Order not found");
        return;
    }

    res.send(order);
}));

// Обновление данных заказа
router.put('/updateDataOfOrder/:orderId', asyncHandler(async (req, res) => {
    const orderId = req.params.orderId;
    const updateDataOfOrder = req.body;

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: updateDataOfOrder,
    });

    if (!updatedOrder) {
        res.status(HTTP_BAD_REQUEST).send("Order not found");
        return;
    }

    res.send(updatedOrder);
}));

// Получение всех заказов для пользователя
router.get("/getAllOrdersForUser/:userId", asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const orders = await prisma.order.findMany({
        where: { userId },
    });

    if (orders.length === 0) {
        res.status(HTTP_BAD_REQUEST).send("No orders found for this user.");
        return;
    }

    res.send(orders);
}));

export default router;