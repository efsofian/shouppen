import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.mongo.js";
import User from "../models/userModel.mongo.js";

export const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};
	const count = await Product.countDocuments(keyword);
	const products = await Product.find(keyword)
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	if (!products || !products.length) {
		res.status(404);
		throw new Error("DB EMPTY");
	} else {
		res
			.status(200)
			.json({ products, page, pages: Math.ceil(count / pageSize) });
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

export const createProductReview = asyncHandler(async (req, res) => {
	const { item, rating, comment } = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		const alreadyReview = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);
		if (alreadyReview) {
			res.status(400);
			throw new Error("Product Already Reviewed");
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};
		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, curr) => curr.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review Added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export const getTopProducts = asyncHandler(async (req, res) => {
	console.log("hellotest");
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	res.json(products);
});
