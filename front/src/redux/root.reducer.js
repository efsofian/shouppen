import { combineReducers } from "redux";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
} from "./user/user.reducer";
import orderReducer from "./order/order.reducer";
import cartReducer from "./cart/cart.reducer";
import {
	productListReducer,
	productDetailsReducer,
} from "./product/product.reducer";

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	order: orderReducer,
	cart: cartReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

export default reducers;
