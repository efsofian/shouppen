import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import colors from "colors";
import User from "./models/userModel.mongo.js";
import Product from "./models/productModel.mongo.js";
import Order from "./models/orderModel.mongo.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";

connectDB(process.env.MONGO_URI);

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0];
		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUser,
		}));
		await Product.insertMany(sampleProducts);
		console.log("Users Imported".green.inverse);
		console.log("Sample Products Imported".green.inverse);
		process.exit();
	} catch (e) {
		console.error(`${e.message}`.red);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data Destroyed".red);
		process.exit();
	} catch (e) {
		console.error(`${e.message}`.red);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
