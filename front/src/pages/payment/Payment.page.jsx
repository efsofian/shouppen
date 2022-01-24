import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../../components/form/FormContainer.component";
import CheckoutSteps from "../../components/checkout/CheckoutSteps.component";
import { savePaymentMethod } from "../../redux/cart/cart.actions";

const Payment = () => {
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress) {
		navigate("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("Paypal");

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>

					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
						<Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary" className="mt-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default Payment;
