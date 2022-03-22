import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import ordersRequest from '../../../service/apis/orders';
import { OrderItem } from '../../../shared/types';
import { PostOrdersSuccessPayload } from '../carts/types';
import { ordersActions } from './slice';

function* getOrdersSaga() {
  try {
    const orders: OrderItem[] = yield call(ordersRequest.getOrders);

    yield put(ordersActions.getOrders.success({ orders }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(ordersActions.getOrders.failure({ error }));
    }
  }
}

function* postOrdersSaga({ payload: { newOrderDetails } }: PayloadAction<PostOrdersSuccessPayload>) {
  try {
    yield call(ordersRequest.addOrderItem, newOrderDetails);

    yield put(ordersActions.postOrders.success({ newOrderDetails }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(ordersActions.postOrders.failure({ error }));
    }
  }
}

export default function* ordersSaga() {
  const { getOrders, postOrders } = ordersActions;

  yield takeLatest(getOrders.request, getOrdersSaga);
  yield takeEvery(postOrders.request, postOrdersSaga);
}
