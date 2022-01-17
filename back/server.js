import express from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productRouter from "./routes/product.router.js";
const PORT = process.env.PORT || 5000;
const app = express();

db(process.env.MONGO_URI);

app.use("/api/products", productRouter);

app.listen(PORT, () => {
	console.log(`listening on PORT: ${PORT}`);
});
