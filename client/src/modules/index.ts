import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import products, { productsSaga } from "src/modules/products";

const rootReducer = combineReducers({
  products,
});

export function* rootSaga() {
  yield all([productsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
