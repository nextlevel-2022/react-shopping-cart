import { BaseRequestReducerState, Product } from '../../../shared/types';

export const PRODUCTS = 'products' as const;

export type Products = Product[];

export interface GetProductsResponseType {
  products: Product[];
}

export interface ProductsReducerState {
  products: BaseRequestReducerState<Products>;
}
