import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.component";
import Product from "./pages/product/Product.page";
import Cart from "./pages/cart/Cart.page";
import Footer from "./components/footer/Footer.component";
import Home from "./pages/home/Home.page";
import Login from "./pages/login/Login.page";
import Register from "./pages/register/Register.page";
import Profile from "./pages/profile/Profile.page";
import Shipping from "./pages/shipping/Shipping.page";
import Payment from "./pages/payment/Payment.page";
import PlaceOrder from "./pages/placeorder/PlaceOrder.page";
import Order from "./pages/order/Order.page";
import UserList from "./pages/userlist/UserList.page";
import UserEdit from "./pages/useredit/UserEdit.page";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/cart/:id" element={<Cart />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/shipping" element={<Shipping />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/placeorder" element={<PlaceOrder />} />
						<Route path="/order/:id" element={<Order />} />
						<Route path="/admin/userlist" element={<UserList />} />
						<Route path="/admin/user/:id/edit" element={<UserEdit />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
