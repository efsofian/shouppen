import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
	Container,
	Row,
	Col,
	Form,
	Image,
	ListGroup,
	Card,
	Button,
} from "react-bootstrap";
import Rating from "../../components/rating/Rating.component";
import Loader from "../../components/loader/Loader.component";
import Message from "../../components/message/Message.component";
import { listProductDetails } from "../../redux/product/product.actions";

const Product = () => {
	const [qty, setQty] = useState(1);
	const productDetails = useSelector((state) => state.productDetails);
	const navigate = useNavigate();
	const { loading, error, product } = productDetails;
	const dispatch = useDispatch();
	const { id } = useParams();
	const addToCartHandler = (e) => {
		navigate(`/cart/${id}?qty=${qty}`);
	};
	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	return (
		<Container>
			<Link className="btn btn-dark my-5" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}>
													{[...Array(product.countInStock)].map((x, i) => (
														<option key={i + 1} value={parseInt(i) + 1}>
															{i + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default Product;
