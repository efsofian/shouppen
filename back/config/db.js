import mongoose from "mongoose";

async function connectDB(uri) {
	await mongoose.connect(uri);
	console.log("db connected");
}

export default connectDB;
