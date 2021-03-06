import axios from "axios";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from "./order.types";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.post(`/api/orders`, order, options);
		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/${id}`, options);
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_PAY_REQUEST,
			});
			const { token } = getState().userLogin.userInfo;
			const options = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				options
			);
			dispatch({
				type: ORDER_PAY_SUCCESS,
				payload: data,
			});
		} catch (e) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload:
					e.response && e.response.data.message
						? e.response.data.message
						: e.message,
			});
		}
	};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`/api/orders/myorders`, options);
		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.get(`/api/orders`, options);
		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios.put(`/api/orders/${order._id}/deliver`, {}, options);
		dispatch({
			type: ORDER_DELIVER_SUCCESS,
		});
	} catch (e) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};
