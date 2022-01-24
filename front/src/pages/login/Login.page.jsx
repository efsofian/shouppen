import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../../components/form/FormContainer.component";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import { login } from "../../redux/user/user.actions";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [searchparams] = useSearchParams();
	const { loading, error, userInfo } = useSelector((state) => state.userLogin);
	const navigate = useNavigate();
	const redirect = searchparams.get("redirect")
		? searchparams.get("redirect")
		: "";
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			navigate(`/${redirect}`);
		}
	}, [dispatch, userInfo, navigate, redirect]);
	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-3">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default Login;
