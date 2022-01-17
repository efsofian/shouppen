import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: String,
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
