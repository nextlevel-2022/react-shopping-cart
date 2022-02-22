import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseRequestReducerState, Product } from '../../../shared/types';
import { productsAsyncActions } from './asyncActions';
import { PRODUCTS, Products } from './types';

interface ProductsReducerState {
  products: BaseRequestReducerState<Products>;
}

export const ProductsReducerInitialState: ProductsReducerState = {
  products: {
    value: [],
    isLoading: false,
    hasError: false,
    error: null,
  },
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
