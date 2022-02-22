import { createAsyncAction } from 'typesafe-actions';

import { GetProductsErrorType, GetProductsResponseType, PRODUCTS } from './types';

const GetProductsActionType = {
  GET_PRODUCTS: `${PRODUCTS}/GET_${PRODUCTS}`,
  GET_PRODUCTS_SUCCESS: `${PRODUCTS}/GET_${PRODUCTS}_SUCCESS`,
  GET_PRODUCTS_FAILURE: `${PRODUCTS}/GET_${PRODUCTS}_FAILURE`,
} as const;

const getProductsAsyncAction = createAsyncAction(
  GetProductsActionType.GET_PRODUCTS,
  GetProductsActionType.GET_PRODUCTS_SUCCESS,
  GetProductsActionType.GET_PRODUCTS_FAILURE,
)<void, GetProductsResponseType, GetProductsErrorType>();

export const productsAsyncActions = { getProductsAsyncAction };
