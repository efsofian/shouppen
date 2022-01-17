import products from "../data/products.js";

export const getAllProducts = (req, res) => {
	res.json(products);
};

export const getOneProduct = (req, res) => {
	res.json(products[req.params.id]);
};
export const createProduct = () => {};
export const updateProduct = () => {};
export const deleteProduct = () => {};
