import mongoose from "mongoose";

async function connectDB(uri) {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
	} catch (e) {
		console.error(`${e.message}`);
		process.exit(1);
	}
}

export default connectDB;
