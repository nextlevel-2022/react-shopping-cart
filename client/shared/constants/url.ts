import { CartItem, OrderItem, Product, RequestInfo } from '../types';

export const BASE_URL = 'http://localhost:3003';

export const URL = {
  HOME: () => '/',
  PRODUCT_DETAIL: (productId: string | number) => `/product/${productId}`,
  CART: () => '/cart',
  ORDER: () => '/order',
} as const;

export const REQUEST = {
  /** products **/
  GET_PRODUCTS: (): RequestInfo => ({ method: 'get', url: '/products' }),
  GET_PRODUCT_BY_ID: (id: Product['id']): RequestInfo => ({
    method: 'get',
    url: `/products/${id}`,
  }),
  POST_PRODUCT: (): RequestInfo => ({ method: 'post', url: '/products' }),
  DELETE_PRODUCT_BY_ID: (id: Product['id']): RequestInfo => ({
    method: 'delete',
    url: `/products/${id}`,
  }),

  /** carts **/
  GET_CARTS: (): RequestInfo => ({ method: 'get', url: '/carts' }),
  POST_CART: (): RequestInfo => ({ method: 'post', url: '/carts' }),
  DELETE_CART_BY_ID: (id: CartItem['id']): RequestInfo => ({
    method: 'delete',
    url: `/carts/${id}`,
  }),

  /** orders */
  GET_ORDERS: (): RequestInfo => ({ method: 'get', url: '/orders' }),
  POST_ORDER: (): RequestInfo => ({ method: 'post', url: '/orders' }),
  GET_ORDER_BY_ID: (id: OrderItem['id']): RequestInfo => ({ method: 'get', url: `/orders/${id}` }),
} as const;
