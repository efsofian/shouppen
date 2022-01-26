import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Meta from "../../components/meta/Meta.component.jsx";
import ProductCarousel from "../../components/productCarousel/ProductCarousel.component.jsx";
import Product from "../../components/product/Product.component.jsx";
import Message from "../../components/message/Message.component.jsx";
import Paginate from "../../components/paginate/Paginate.component.jsx";
import Loader from "../../components/loader/Loader.component.jsx";
import { listProducts } from "../../redux/product/product.actions.js";

const Home = () => {
	const params = useParams();
	const { keyword } = params;
	const pageNumber = params.pageNumber || 1;
	const productList = useSelector((state) => state.productList);
	const { loading, products, error, pages, page } = productList;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);
	return (
		<Container className="mt-3">
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Lastest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</Container>
	);
};

export default Home;
