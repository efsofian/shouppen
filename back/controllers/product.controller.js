import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.mongo.js";
import User from "../models/userModel.mongo.js";

export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	if (!products || !products.length) {
		res.status(404);
		throw new Error("DB EMPTY");
	} else {
		res.status(200).json(products);
	}
});

export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error("Product not found");
	} else {
		res.json(product);
	}
});

export const createProduct = asyncHandler(async (req, res) => {
	// const product = new Product(req.body);
	console.log("create product controller");
	res.json("product created");
});

export const updateProduct = () => {
	try {
	} catch (e) {}
};
export const deleteProduct = async (req, res) => {
	const product = await Product.findById(req.params.id)
		.populate("user", "isAdmin")
		.exec();
	console.log(product);
	const creatorIsAdmin = product.user.isAdmin;
	if (!creatorIsAdmin) {
		res.status(403).json({ msg: "You are not Admin to delete product" });
	}
	if (req.user.id)
		try {
			await product.remove();
			res.json({ msg: "product Removed" });
		} catch (e) {}
};

export const createProductReview = asyncHandler(async (req, res) => {});

export const getTopProducts = asyncHandler(async (req, res) => {});
