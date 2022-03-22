import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { BaseRequestFailure, OrderItem, RootState } from '../../../shared/types';
import { createFailureReducer, createRequestReducer } from '../../../shared/utils/redux';
import { PostOrdersRequestPayload, PostOrdersSuccessPayload } from '../carts/types';
import { GetOrdersSuccessPayload, ORDERS, OrdersReducerState } from './types';

const ordersAsyncActions = {
  getOrders: createAsyncAction(
    `${ORDERS}/GET_${ORDERS}`,
    `${ORDERS}/GET_${ORDERS}_SUCCESS`,
    `${ORDERS}/GET_${ORDERS}_FAILURE`,
  )<void, GetOrdersSuccessPayload, BaseRequestFailure>(),

  postOrders: createAsyncAction(
    `${ORDERS}/POST_${ORDERS}`,
    `${ORDERS}/POST_${ORDERS}_SUCCESS`,
    `${ORDERS}/POST_${ORDERS}_FAILURE`,
  )<PostOrdersRequestPayload, PostOrdersSuccessPayload, BaseRequestFailure>(),
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
    const { getOrders, postOrders } = ordersAsyncActions;

    builder
      .addCase(`${getOrders.request}`, createRequestReducer(ORDERS))
      .addCase(`${getOrders.failure}`, createFailureReducer(ORDERS))
      .addCase(`${getOrders.success}`, (state, { payload: { orders } }: PayloadAction<GetOrdersSuccessPayload>) => {
        state.orders.isLoading = false;
        state.orders.value = orders;
      })

      .addCase(`${postOrders.request}`, createRequestReducer<PostOrdersRequestPayload>(ORDERS))
      .addCase(`${postOrders.failure}`, createFailureReducer(ORDERS))
      .addCase(
        `${postOrders.success}`,
        (state, { payload: { newOrderDetails } }: PayloadAction<PostOrdersSuccessPayload>) => {
          state.orders.isLoading = false;

          state.orders.value.push({
            id: 1,
            orderDetails: newOrderDetails,
          });
        },
      );
  },
});

export const ordersActions = { ...ordersSlice.actions, ...ordersAsyncActions };
export const ordersReducer = ordersSlice.reducer;
