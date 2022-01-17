import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product.component.jsx";

const Home = () => {
	console.log("log");
	const [products, setProducts] = React.useState([]);
	useEffect(() => {
		console.log("effect");
		const fetchProd = async () => {
			const res = await axios.get("/api/products");
			setProducts(res.data);
		};
		fetchProd();
	}, []);
	if (products.length === 0) {
		return <>wait</>;
	}
	return (
		<Container className="mt-3">
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
