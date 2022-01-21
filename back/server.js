import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import db from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
dotenv.config();
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import userRouter from "./routes/user.router.js";
import uploadRouter from "./routes/upload.router.js";

const PORT = process.env.PORT || 5000;
const app = express();

db(process.env.MONGO_URI);

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`listening on PORT: ${PORT}`.yellow.bold);
});
