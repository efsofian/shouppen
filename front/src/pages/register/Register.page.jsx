import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../../components/form/FormContainer.component";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import { register } from "../../redux/user/user.actions";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [message, setMessage] = useState("");
	const [searchparams] = useSearchParams();
	const { loading, error, userInfo } = useSelector(
		(state) => state.userRegister
	);
	const navigate = useNavigate();
	const redirect = searchparams.get("redirect")
		? searchparams.get("redirect")
		: "/";
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confPassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(register(name, email, password));
		}
	};
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [dispatch, userInfo, navigate, redirect]);
	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Enter Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>

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

				<Form.Group controlId="confpassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confPassword}
						onChange={(e) => setConfPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-3">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an account ?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default Register;
