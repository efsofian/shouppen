import express from "express";
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts,
} from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/top", getTopProducts);

router.get("/:id", getProductById);

router.post("/:id/reviews", protect, createProductReview);

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;
