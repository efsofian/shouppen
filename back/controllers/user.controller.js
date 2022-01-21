import asyncHandler from "express-async-handler";
import User from "../models/userModel.mongo.js";
import { generateToken } from "../utils/generateToken.js";

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User already exist");
	} else {
		const user = new User({
			name,
			email,
			password,
		});
		await user.save();
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(404);
			throw new Error("Invalid user data");
		}
	}
});

export const updateUserProfile = asyncHandler(async (req, res) => {});

export const getUsers = asyncHandler(async (req, res) => {});

export const deleteUser = asyncHandler(async (req, res) => {});

export const getUserById = asyncHandler(async (req, res) => {});

export const updateUser = asyncHandler(async (req, res) => {});
