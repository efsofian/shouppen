import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
} from "react-bootstrap";
import Rating from "../../components/rating/Rating.component";

const Product = () => {
	const [product, setProduct] = React.useState([]);
	const { id } = useParams();
	useEffect(() => {
		const fetchProd = async () => {
			const res = await axios.get(`/api/products/${id}`);
			setProduct(res.data);
		};
		fetchProd();
	}, [id]);

	if (product.length === 0) {
		return <>wait</>;
	}
	return (
		<Container>
			<Link className="btn btn-dark my-5" to="/">
				Go Back
			</Link>
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
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Product;
