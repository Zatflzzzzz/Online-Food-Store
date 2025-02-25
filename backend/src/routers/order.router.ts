import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http.status";
import { OrderStatus } from "../constants/order.status";
import { OrderModel } from "../models/order.model";
import auth from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post("/createOrder", asyncHandler(async (req: any, res: any) => {
    const requestOrder = req.body;
  
    if (requestOrder.items.length <= 0) {
      res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
      return;
    }
  
    const order = await OrderModel.create({
      ...requestOrder,
      user: req.user.id,
      status: OrderStatus.NEW
    });
  
    res.send(order);
  }));

router.get('/orderForUser/:orderId', asyncHandler(async (req:any, res) => {
    const orderId = req.params.orderId;
    const order = await OrderModel.findById(orderId);
    
    if(!order) {
      res.status(HTTP_BAD_REQUEST).send();
      return
    }
    
    res.send(order);
}));

router.get('/updateDataOfOrder/:orderId', asyncHandler(async (req:any, res) => {
  const orderId = req.params.orderId;
  const updateDataOfOrder = req.order
  
  const order = await OrderModel.findByIdAndUpdate(orderId,updateDataOfOrder, {new:false});
  
  if(!order) {
    res.status(HTTP_BAD_REQUEST).send();
    return
  }
  
  res.send();
}))

router.get("/getAllOrdersForUser/:userId", asyncHandler(async (req:any, res) => {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ user: userId });

    if (orders.length === 0) {
        res.status(HTTP_BAD_REQUEST).send("No orders found for this user.");
        return;
    }

    res.send(orders);
}));

export default router;
