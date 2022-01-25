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
	const product = new Product({
		name: "sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpeg",
		brand: "sample brand",
		category: "sample category",
		countInStock: 0,
		numReviews: 0,
		description: "sample description",
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.countInStock = countInStock;
		product.category = category;
		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export const createProductReview = asyncHandler(async (req, res) => {});

export const getTopProducts = asyncHandler(async (req, res) => {});
