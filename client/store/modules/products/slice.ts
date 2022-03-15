import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { BaseRequestFailure } from '../../../shared/types';
import { GetProductsResponseType, PRODUCTS, ProductsReducerState } from './types';

const productsAsyncActions = {
  getProductsAsyncAction: createAsyncAction(
    `${PRODUCTS}/GET_${PRODUCTS}`,
    `${PRODUCTS}/GET_${PRODUCTS}_SUCCESS`,
    `${PRODUCTS}/GET_${PRODUCTS}_FAILURE`,
  )<void, GetProductsResponseType, BaseRequestFailure>(),
};

export const productsSlice = createSlice({
  name: PRODUCTS,
  initialState: {
    products: {
      value: [],
      isLoading: false,
      hasError: false,
      error: null,
    },
  } as ProductsReducerState,
  reducers: {},
  extraReducers: (builder) => {
    const { getProductsAsyncAction } = productsActions;

    builder
      .addCase(`${getProductsAsyncAction.request}`, (state, _) => {
        state.products.isLoading = true;
      })
      .addCase(
        `${getProductsAsyncAction.success}`,
        (state, { payload: { products } }: PayloadAction<GetProductsResponseType>) => {
          state.products.isLoading = false;
          state.products.value = products;
        },
      )
      .addCase(
        `${getProductsAsyncAction.failure}`,
        (state, { payload: { error } }: PayloadAction<BaseRequestFailure>) => {
          state.products.isLoading = false;
          state.products.hasError = true;
          state.products.error = error;
        },
      );
  },
});

export const productsActions = { ...productsSlice.actions, ...productsAsyncActions };
export const productsReducer = productsSlice.reducer;
