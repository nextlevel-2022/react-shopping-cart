import { Product } from '../../../shared/types';

export const PRODUCTS = 'products' as const;

export type Products = Product[];

export interface GetProductsResponseType {
  [products: string]: Product[];
}

export interface GetProductsErrorType {
  [error: string]: Error | unknown;
}
