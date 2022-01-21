import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.component";
import Product from "./pages/product/Product.page";
import Cart from "./pages/cart/Cart.page";
import Footer from "./components/footer/Footer.component";
import Home from "./pages/home/Home.page";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="/cart/:id" element={<Cart />} />
						<Route path="/cart/" element={<Cart />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
