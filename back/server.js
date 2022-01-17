const express = require("express");
const db = require("./config/db");
require("dotenv").config();
const User = require("./models/userModel.mongo");
const PORT = process.env.PORT || 5000;
const app = express();

db(process.env.MONGO_URI);

app.get("/", async (req, res) => {
	const user = new User({
		name: "sofian",
	});
	await user.save();
	res.json(user);
});

app.listen(PORT, () => {
	console.log(`listening on PORT: ${PORT}`);
});
