import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	name: String,
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
