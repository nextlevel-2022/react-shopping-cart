import { BaseRequestReducerState, Product } from '../../../shared/types';

export const PRODUCTS = 'products' as const;

export type Products = Product[];

export interface GetProductsResponseType {
  [products: string]: Product[];
}

export interface GetProductsErrorType {
  [error: string]: Error | unknown;
}

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
