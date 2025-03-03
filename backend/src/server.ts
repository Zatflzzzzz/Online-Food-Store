import dotenv from "dotenv"
dotenv.config();

import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router"
import userRouter from "./routers/user.router"
import orderRouter from "./routers/order.router"
import emailRouter from "./routers/email.router"
import adminRouter from "./routers/admin.router"
import { dbConnect } from "./configs/database.config";

dbConnect();
const app = express();
app.use(express.json());

app.use(cors())

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/email", emailRouter);
app.use("/api/admin", adminRouter);

const port = 3000;
app.listen(port, ()=>{
     console.log("Website served on http://localhost:" + port)
})