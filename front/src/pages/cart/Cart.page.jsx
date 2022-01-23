import React, { useEffect } from "react";
import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import Message from "../../components/message/Message.component";
import { addToCart, removeFromCart } from "../../redux/cart/cart.actions";

const Cart = () => {
	const productId = useParams().id;
	const navigate = useNavigate();
	const [searchparams] = useSearchParams();
	const qty = searchparams.get("qty") ? searchparams.get("qty") : 1;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const dispatch = useDispatch();
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	const checkOutHandler = () => {
		navigate("/login?redirect=shipping");
	};

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						You cart is empty <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}>
											{[...Array(item.countInStock)].map((x, i) => (
												<option key={i + 1} value={parseInt(i) + 1}>
													{i + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeFromCartHandler(item.product)}>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Sub Total: ({" "}
								{cartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0)} )
							</h2>
							$
							{cartItems
								.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default Cart;
