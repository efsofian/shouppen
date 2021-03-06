import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import db from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
dotenv.config();
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import userRouter from "./routes/user.router.js";
import uploadRouter from "./routes/upload.router.js";

const PORT = process.env.PORT || 5000;
const app = express();

console.log("env:", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

db(process.env.MONGO_URI);

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(path.resolve(), "../front/build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.join(path.resolve(), "..", "front", "build", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => {
		res.send("API Running...");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`listening on PORT: ${PORT}`.yellow.bold);
});
