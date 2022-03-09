import { AnyAction } from "redux";
import { takeEvery } from "redux-saga/effects";
import { getCartList, deleteProductInCart } from "src/apis";
import {
  createPromiseSaga,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "./../utils/asyncUtils";

const GET_CARTS = "GET_CARTS";
const GET_CARTS_SUCCESS = "GET_CARTS_SUCCESS";
const GET_CARTS_ERROR = "GET_CARTS_ERROR";

const DELETE_CART = "DELETE_CART";
const DELETE_CART_SUCCESS = "DELETE_CART_SUCCESS";
const DELETE_CART_ERROR = "DELETE_CART_ERROR";

export const getCarts = () => ({ type: GET_CARTS });
export const deleteCart = (id: number) => ({
  type: DELETE_CART,
  payload: id,
  meta: id,
});

// saga
const getCartsSaga = createPromiseSaga(GET_CARTS, getCartList);
const deleteCartSaga = createPromiseSaga(DELETE_CART, deleteProductInCart);

export function* cartsSaga() {
  yield takeEvery(GET_CARTS, getCartsSaga);
  yield takeEvery(DELETE_CART, deleteCartSaga);
}

const initialState = {
  carts: reducerUtils.initial(),
};

export default function carts(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_CARTS:
    case GET_CARTS_SUCCESS:
    case GET_CARTS_ERROR:
      return handleAsyncActions(GET_CARTS, "carts", true)(state, action);
    case DELETE_CART:
    case DELETE_CART_SUCCESS:
    case DELETE_CART_ERROR:
      return handleAsyncActionsById(DELETE_CART, "carts", true)(state, action);
    default:
      return state;
  }
}
