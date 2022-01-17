const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	name: String,
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
