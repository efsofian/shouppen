import express from "express";
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, admin, getOrders);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/pay", protect, updateOrderToPaid);

router.put("/:id/deliver", updateOrderToDelivered);

router.post("/", protect, addOrderItems);

export default router;
