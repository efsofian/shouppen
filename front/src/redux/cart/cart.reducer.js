import {
	CART_ADD_ITEM,
	CART_CLEAR_ITEMS,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "./cart.types";

const cartReducer = (state = {}, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default cartReducer;
