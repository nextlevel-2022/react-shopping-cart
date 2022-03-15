import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'typesafe-actions';

import { BaseRequestFailure, CartItem } from '../../../shared/types';
import {
  AddCartItemRequestPayload,
  AddCartItemSuccessPayload,
  CARTS,
  CartsReducerState,
  DeleteCartItemRequestPayload,
  DeleteCartItemSuccessPayload,
  GetCartsSuccessPayload,
} from './types';

const cartsAsyncActions = {
  getCarts: createAsyncAction(
    `${CARTS}/GET_${CARTS}`,
    `${CARTS}/GET_${CARTS}_SUCCESS`,
    `${CARTS}/GET_${CARTS}_FAILURE`,
  )<void, GetCartsSuccessPayload, BaseRequestFailure>(),

  deleteCartItemById: createAsyncAction(
    `${CARTS}/DELETE_CART_ITEM_BY_ID`,
    `${CARTS}/DELETE_CART_ITEM_BY_ID_SUCCESS`,
    `${CARTS}/DELETE_CART_ITEM_BY_ID_FAILURE`,
  )<DeleteCartItemRequestPayload, DeleteCartItemSuccessPayload, BaseRequestFailure>(),

  addCartItem: createAsyncAction(
    `${CARTS}/ADD_NEW_CART_ITEM`,
    `${CARTS}/ADD_NEW_CART_ITEM_SUCCESS`,
    `${CARTS}/ADD_NEW_CART_ITEM_FAILURE`,
  )<AddCartItemRequestPayload, AddCartItemSuccessPayload, BaseRequestFailure>(),
};

export const cartsSlice = createSlice({
  name: CARTS,
  initialState: {
    selectedProducts: [],
    carts: {
      value: [],
      isLoading: false,
      hasError: false,
      error: null,
    },
  } as CartsReducerState,
  reducers: {
    deleteCardItemById: (state, { payload: { idToDeleteCartItem } }: PayloadAction<{ idToDeleteCartItem: number }>) => {
      const targetIndex = state.carts.value.findIndex((cartItem) => cartItem.id === idToDeleteCartItem);

      if (targetIndex === -1) throw new Error('mismatched id');

      state.carts.value.splice(targetIndex, 1);
    },

    increaseCartItemQuantityById: (state, { payload }: PayloadAction<{ cartItemId: number }>) => {
      const targetIndex = state.carts.value.findIndex((cartItem) => cartItem.id === payload.cartItemId);

      if (targetIndex === -1) throw new Error('mismatched id');

      state.carts.value[targetIndex].quantity += 1;
    },

    decreaseCartItemQuantityById: (state, { payload }: PayloadAction<{ cartItemId: number }>) => {
      const targetIndex = state.carts.value.findIndex((cartItem) => cartItem.id === payload.cartItemId);

      if (targetIndex === -1) throw new Error('mismatched id');

      state.carts.value[targetIndex].quantity -= 1;
    },
  },
  extraReducers: (builder) => {
    const { getCarts, deleteCartItemById, addCartItem } = cartsAsyncActions;

    builder
      /** getCarts */
      .addCase(`${getCarts.request}`, (state, _) => {
        state.carts.isLoading = true;
      })
      .addCase(`${getCarts.success}`, (state, { payload: { carts } }: PayloadAction<GetCartsSuccessPayload>) => {
        state.carts.isLoading = false;
        state.carts.value = setDefaultQuantityAllCartItem(carts);
      })
      .addCase(`${getCarts.failure}`, (state, { payload: { error } }: PayloadAction<BaseRequestFailure>) => {
        state.carts.isLoading = false;
        state.carts.hasError = true;
        state.carts.error = error;
      })

      /** deleteCartItemById */
      .addCase(`${deleteCartItemById.request}`, (state, _) => {
        state.carts.isLoading = true;
      })
      .addCase(
        `${deleteCartItemById.success}`,
        (state, { payload: { deletedCartItemId } }: PayloadAction<DeleteCartItemSuccessPayload>) => {
          state.carts.isLoading = false;
          state.carts.value = [...state.carts.value].filter((cartItem) => deletedCartItemId !== cartItem.id);
        },
      )
      .addCase(`${deleteCartItemById.failure}`, (state, { payload: { error } }: PayloadAction<BaseRequestFailure>) => {
        state.carts.isLoading = false;
        state.carts.hasError = true;
        state.carts.error = error;
      })

      /** addCartItem */
      .addCase(`${addCartItem.request}`, (state, _) => {
        state.carts.isLoading = true;
      })
      .addCase(
        `${addCartItem.success}`,
        (state, { payload: { newCartItemProduct } }: PayloadAction<AddCartItemSuccessPayload>) => {
          state.carts.isLoading = false;

          const DEFAULT_CART_ITEM_QUANTITY = 1;
          const newCartItem: CartItem = {
            id: createCartItemId(state.carts.value),
            product: newCartItemProduct,
            quantity: DEFAULT_CART_ITEM_QUANTITY,
          };

          state.carts.value.push(newCartItem);
        },
      )
      .addCase(`${addCartItem.failure}`, (state, { payload: { error } }: PayloadAction<BaseRequestFailure>) => {
        state.carts.isLoading = false;
        state.carts.hasError = true;
        state.carts.error = error;
      });
  },
});

export const cartsActions = { ...cartsSlice.actions, ...cartsAsyncActions };
export const cartsReducer = cartsSlice.reducer;

/** utils */
const setDefaultQuantityCartItem = (cartItem: Omit<CartItem, 'quantity'>): CartItem => {
  const DEFAULT_PRODUCT_QUANTITY = 1;

  return { ...cartItem, quantity: DEFAULT_PRODUCT_QUANTITY };
};

const setDefaultQuantityAllCartItem = (carts: Omit<CartItem, 'quantity'>[]): CartItem[] => {
  return carts.map((cartItem) => setDefaultQuantityCartItem(cartItem));
};

const createCartItemId = (carts: CartItem[]) => {
  return carts.map((cartItem) => cartItem.id).reduce((id1, id2) => Math.max(id1, id2), 0) + 1;
};
