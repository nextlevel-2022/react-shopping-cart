import { call, put, takeLatest } from '@redux-saga/core/effects';

import ordersService from '../../../apis/orders';
import { ordersActions } from './slice';
import { OrderItemFromServer } from './types';

function* getOrdersSaga() {
  try {
    const orders: OrderItemFromServer[] = yield call(ordersService.getOrders);

    yield put(ordersActions.getOrders.success({ orders }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(ordersActions.getOrders.failure({ error }));
    }
  }
}

export default function* ordersSaga() {
  const { getOrders } = ordersActions;

  yield takeLatest(getOrders.request, getOrdersSaga);
}
