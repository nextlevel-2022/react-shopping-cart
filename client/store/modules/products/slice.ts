import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { Product } from '../../../shared/types';
import {
  GetProductsErrorType,
  GetProductsResponseType,
  PRODUCTS,
  ProductsReducerInitialState,
} from './types';

const productsAsyncActions = {
  getProductsAsyncAction: createAsyncAction(
    `${PRODUCTS}/GET_${PRODUCTS}`,
    `${PRODUCTS}/GET_${PRODUCTS}_SUCCESS`,
    `${PRODUCTS}/GET_${PRODUCTS}_FAILURE`,
  )<void, GetProductsResponseType, GetProductsErrorType>(),
};

export const productsSlice = createSlice({
  name: PRODUCTS,
  initialState: ProductsReducerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    const { getProductsAsyncAction } = productsActions;

    builder
      .addCase(`${getProductsAsyncAction.request}`, (state, _) => {
        state.products.isLoading = true;
      })
      .addCase(
        `${getProductsAsyncAction.success}`,
        (state, { payload }: PayloadAction<{ products: Product[] }>) => {
          state.products.isLoading = false;
          state.products.value = payload.products;
        },
      )
      .addCase(`${getProductsAsyncAction.failure}`, (state, _) => {
        state.products.isLoading = false;
        state.products.hasError = true;
      });
  },
});

export const productsActions = { ...productsSlice.actions, ...productsAsyncActions };
export const productsReducer = productsSlice.reducer;
