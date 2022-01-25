import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import FormContainer from "../../components/form/FormContainer.component";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import {
	listProductDetails,
	updateProduct,
} from "../../redux/product/product.actions";
import { PRODUCT_UPDATE_RESET } from "../../redux/product/product.types";
import { PRODUCT_DETAILS_RESET } from "../../redux/product/product.types";
const ProductEdit = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);
	const productId = useParams().id;
	const { loading, error, product } = useSelector(
		(state) => state.productDetails
	);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = useSelector((state) => state.productUpdate);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		setUploading(true);

		try {
			const options = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			const { data } = await axios.post("/api/upload", formData, options);
			setImage(data);
			setUploading(false);
		} catch (e) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			})
		);
	};
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_DETAILS_RESET });
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (product.name === undefined) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, productId, navigate, product, successUpdate]);
	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Enter Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}></Form.Control>
							<Form.Control
								type="file"
								label="Choose File"
								onChange={uploadFileHandler}></Form.Control>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter count in stock"
								value={countInStock}
								onChange={(e) =>
									setCountInStock(e.target.value)
								}></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary" className="mt-3">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEdit;
