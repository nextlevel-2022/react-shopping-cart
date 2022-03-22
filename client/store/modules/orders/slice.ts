import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { BaseRequestFailure } from '../../../shared/types';
import { GetOrdersSuccessPayload, ORDERS, OrdersReducerState } from './types';

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
      .addCase(`${getOrders.request}`, createRequestReducer(ORDERS))
      .addCase(`${getOrders.failure}`, createFailureReducer(ORDERS))
      .addCase(`${getOrders.success}`, (state, { payload: { orders } }: PayloadAction<GetOrdersSuccessPayload>) => {
        state.orders.isLoading = false;
        state.orders.value = orders;
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
