import { takeEvery } from "redux-saga/effects";
import { AnyAction } from "redux";
import { getProductList, getProduct } from "../apis";
import {
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
  createPromiseSaga,
} from "../utils/asyncUtils";

const GET_PRODUCT = "GET_PRODUCT";
const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";

// actions
export const getProducts = () => ({ type: GET_PRODUCTS });
export const getProductById = (id: number) => ({
  type: GET_PRODUCT,
  payload: id,
  meta: id,
});

// saga
const getProductSaga = createPromiseSaga(GET_PRODUCT, getProduct);
const getProductsSaga = createPromiseSaga(GET_PRODUCTS, getProductList);

export function* productsSaga() {
  yield takeEvery(GET_PRODUCT, getProductSaga);
  yield takeEvery(GET_PRODUCTS, getProductsSaga);
}

const initialState = {
  products: reducerUtils.initial(),
  product: reducerUtils.initial(),
};

// reducer
export default function products(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_PRODUCTS:
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_ERROR:
      return handleAsyncActions(GET_PRODUCTS, "products", true)(state, action);
    case GET_PRODUCT:
    case GET_PRODUCT_SUCCESS:
    case GET_PRODUCT_ERROR:
      return handleAsyncActionsById(
        GET_PRODUCT,
        "product",
        true
      )(state, action);
    default:
      return state;
  }
}
