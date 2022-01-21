import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product.component.jsx";
import Message from "../../components/message/Message.component.jsx";
import Loader from "../../components/loader/Loader.component.jsx";
import { listProducts } from "../../redux/product/product.actions.js";

const Home = () => {
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<Container className="mt-3">
			<h1>Lastest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</Container>
	);
};

export default Home;
