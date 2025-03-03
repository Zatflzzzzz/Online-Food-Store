import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router"
import userRouter from "./routers/user.router"
import orderRouter from "./routers/order.router"
import emailRouter from "./routers/email.router"
import adminRouter from "./routers/admin.router"
import {dbConnect} from "./configs/database.config";
import {seedDatabase} from "../prisma/seed";

dotenv.config();

dbConnect();

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(express.json());

app.use(cors())

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/email", emailRouter);
app.use("/api/admin", adminRouter);

const port = 3000;

if (!JWT_SECRET) {
     throw new Error("JWT_SECRET is not defined. Set it in the .env file.");
}

async function startServer() {
     await seedDatabase(); // Заполняем БД перед запуском сервера

     app.listen(port, () => {
          console.log("Website served on http://localhost:" + port);
     });
}

// Вызываем startServer(), чтобы запустить сервер и заполнить БД
startServer().catch((err) => {
     console.error("Failed to start server:", err);
});