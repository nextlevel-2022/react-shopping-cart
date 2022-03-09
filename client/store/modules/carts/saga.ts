import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import cartsService from '../../../apis/carts';
import { CartItem } from '../../../shared/types';
import { cartsActions } from './slice';
import { AddCartItemRequestPayload, DeleteCartItemRequestPayload } from './types';

export function* getCartsSaga() {
  try {
    const carts: Omit<CartItem, 'quantity'>[] = yield call(cartsService.getCarts);

    yield put(cartsActions.getCarts.success({ carts }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(cartsActions.getCarts.failure({ error }));
    }
  }
}

export function* deleteCartItemByIdSaga({
  payload: { idToDeleteCartItem },
}: PayloadAction<DeleteCartItemRequestPayload>) {
  try {
    yield call(cartsService.deleteCartItemById, idToDeleteCartItem);
    yield put(cartsActions.deleteCartItemById.success({ deletedCartItemId: idToDeleteCartItem }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(cartsActions.deleteCartItemById.failure({ error }));
    }
  }
}

export function* addNewCartItemSaga({ payload: { product } }: PayloadAction<AddCartItemRequestPayload>) {
  try {
    yield call(cartsService.addCartItem, product);
    yield put(cartsActions.addCartItem.success({ newCartItemProduct: product }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(cartsActions.deleteCartItemById.failure({ error }));
    }
  }
}

export default function* cartsSaga() {
  const { getCarts, deleteCartItemById, addCartItem } = cartsActions;

  yield takeLatest(getCarts.request, getCartsSaga);
  yield takeEvery(addCartItem.request, addNewCartItemSaga);
  yield takeEvery(deleteCartItemById.request, deleteCartItemByIdSaga);
}
