import { store } from '../../store';
import { CARTS } from '../../store/modules/carts/types';
import { ORDERS } from '../../store/modules/orders/types';
import { PRODUCTS } from '../../store/modules/products/types';
import { BUTTON_SIZE, COLOR } from '../constants/css';
import { REQUEST } from '../constants/url';

export type Color = typeof COLOR[keyof typeof COLOR];
export type ButtonSize = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];

export type RequestMethod = 'get' | 'post' | 'delete' | 'put';
export type RequestInfo = { method: RequestMethod; url: string };
export type RequestInfoWithParams = (id?: string) => RequestInfo;
export type Request = {
  [key: string]: RequestInfoWithParams;
};
export type REQUEST_TYPE = typeof REQUEST[keyof typeof REQUEST];
export type ReturnedRequestInfo = ReturnType<REQUEST_TYPE>;

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

// redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface BaseRequestReducerState<Value> {
  value: Value;
  isLoading: boolean;
  hasError: boolean;
  error: Error | null;
}

export interface BaseRequestFailure {
  error: Error;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

// redux-orders
export interface OrderItem {
  id: number;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  product: Product;
  quantity: number;
}

export type MODELS = typeof PRODUCTS | typeof CARTS | typeof ORDERS;
