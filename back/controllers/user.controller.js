import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

export const authUser = asyncHandler(async (req, res) => {});

export const registerUser = asyncHandler(async (req, res) => {});

export const getUserProfile = asyncHandler(async (req, res) => {});

export const updateUserProfile = asyncHandler(async (req, res) => {});

export const getUsers = asyncHandler(async (req, res) => {});

export const deleteUser = asyncHandler(async (req, res) => {});

export const getUserById = asyncHandler(async (req, res) => {});

export const updateUser = asyncHandler(async (req, res) => {});
