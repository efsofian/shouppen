import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Loader from "../../components/loader/Loader.component";
import Message from "../../components/message/Message.component";
import { getOrderDetails, payOrder } from "../../redux/order/order.actions";
import { ORDER_PAY_RESET } from "../../redux/order/order.types";

const Order = () => {
	const { id: OrderId } = useParams();
	const [sdkReady, setSdkReady] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(OrderId, paymentResult));
	};
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order || successPay || order._id !== OrderId) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(OrderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, navigate, order, successPay, OrderId, userInfo]);
	if (!loading) {
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
		);
	}
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address} , {order.shippingAddress.city}{" "}
								{order.shippingAddress.postalCode},{" "}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method:</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid on {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items:</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty.</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col md={1}>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = $
													{addDecimals(item.qty * item.price)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Order;
