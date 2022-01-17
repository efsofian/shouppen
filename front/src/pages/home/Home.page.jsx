import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import products from "../../products";
import Product from "../../components/product/Product.component.jsx";

const Home = () => {
	return (
		<Container>
			<h1>Lastest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Home;
