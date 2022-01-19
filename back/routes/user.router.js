import express from "express";
import { protect, admin } from "../middleware/auth.middleware.js";
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", registerUser);

router.post("/login", authUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
