import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../../components/form/FormContainer.component";
import Message from "../../components/message/Message.component";
import Loader from "../../components/loader/Loader.component";
import { getUserDetails, updateUser } from "../../redux/user/user.actions";
import { USER_UPDATE_RESET } from "../../redux/user/user.types";

const UserEdit = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const userId = useParams().id;
	const { loading, error, user } = useSelector((state) => state.userDetails);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = useSelector((state) => state.userUpdate);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(`==> ${isAdmin}`);
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};
	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== userId) {
				console.log(userId);
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, user, userId, navigate, successUpdate]);
	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
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

						<Form.Group controlId="isadmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
						</Form.Group>

						<Button type="submit" variant="primary" className="mt-3">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEdit;
