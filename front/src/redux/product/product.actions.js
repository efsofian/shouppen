import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from "./product.types";

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axios.get("/api/products");
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios.delete(`/api/products/${id}`, options);
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (e) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			"Content-Type": "application/json",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.post(`/api/products`, {}, options);
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});
		const { token } = getState().userLogin.userInfo;
		const options = {
			"Content-Type": "application/json",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			options
		);
		console.log("AXIOS UPDAAATE ", axios);
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (e) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				e.response && e.response.data.message
					? e.response.data.message
					: e.message,
		});
	}
};
