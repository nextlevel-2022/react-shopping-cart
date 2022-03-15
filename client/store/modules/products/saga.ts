import { call, put, takeLatest } from '@redux-saga/core/effects';

import productsRequest from '../../../service/apis/products';
import { Product } from '../../../shared/types';
import { productsActions } from './slice';

function* getProductsSaga(_: ReturnType<typeof productsActions.getProductsAsyncAction.request>) {
  try {
    const products: Product[] = yield call(productsRequest.getProducts);

    yield put(productsActions.getProductsAsyncAction.success({ products }));
  } catch (error) {
    yield put(productsActions.getProductsAsyncAction.failure({ error }));
  }
}

export default function* productsSaga() {
  const { getProductsAsyncAction } = productsActions;

  yield takeLatest(getProductsAsyncAction.request, getProductsSaga);
}
