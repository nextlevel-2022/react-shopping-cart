import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import products, { productsSaga } from "src/sagas/products";
import carts, { cartsSaga } from "src/sagas/carts";

const rootReducer = combineReducers({
  products,
  carts,
});

export function* rootSaga() {
  yield all([productsSaga(), cartsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
