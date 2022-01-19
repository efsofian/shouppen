import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import orderReducer from "./order/order.reducer";
import cartReducer from "./cart/cart.reducer";
import productReducer from "./product/product.reducer";

const reducers = combineReducers({
	user: userReducer,
	order: orderReducer,
	cart: cartReducer,
	product: productReducer,
});

export default reducers;
