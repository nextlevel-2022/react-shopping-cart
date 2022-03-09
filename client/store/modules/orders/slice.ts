import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { BaseRequestFailure, OrderDetail, OrderItem } from '../../../shared/types';
import {
  GetOrdersSuccessPayload,
  OrderDetailFromServer,
  OrderItemFromServer,
  ORDERS,
  OrdersReducerState,
} from './types';

const ordersAsyncActions = {
  getOrders: createAsyncAction(
    `${ORDERS}/GET_${ORDERS}`,
    `${ORDERS}/GET_${ORDERS}_SUCCESS`,
    `${ORDERS}/GET_${ORDERS}_FAILURE`,
  )<void, GetOrdersSuccessPayload, BaseRequestFailure>(),
};

export const ordersSlice = createSlice({
  name: ORDERS,
  initialState: {
    orders: {
      value: [],
      isLoading: false,
      hasError: false,
      error: null,
    },
  } as OrdersReducerState,
  reducers: {},
  extraReducers: (builder) => {
    const { getOrders } = ordersAsyncActions;

    builder
      .addCase(`${getOrders.request}`, (state, _) => {
        state.orders.isLoading = true;
      })
      .addCase(`${getOrders.success}`, (state, { payload: { orders } }: PayloadAction<GetOrdersSuccessPayload>) => {
        state.orders.isLoading = false;
        state.orders.value = createRefinedOrders(orders);
      })
      .addCase(`${getOrders.failure}`, (state, { payload: { error } }: PayloadAction<BaseRequestFailure>) => {
        state.orders.isLoading = false;
        state.orders.hasError = true;
        state.orders.error = error;
      });
  },
});

export const ordersActions = { ...ordersSlice.actions, ...ordersAsyncActions };
export const ordersReducer = ordersSlice.reducer;

/** utils */
const createRefinedOrders = (originalOrders: OrderItemFromServer[]): OrderItem[] =>
  originalOrders.map(({ id, orderDetails }) => ({
    id,
    orderDetails: divideProductAndQuantity(orderDetails),
  }));

const divideProductAndQuantity = (originalOrderDetail: OrderDetailFromServer[]): OrderDetail[] => {
  return originalOrderDetail.map((orderItem) => {
    const { id, name, price, imageUrl, quantity } = orderItem;

    return {
      product: { id, name, price, imageUrl },
      quantity,
    };
  });
};
