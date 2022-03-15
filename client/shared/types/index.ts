import { store } from '../../store';
import { COLOR } from '../constants/css';
import { REQUEST } from '../constants/url';

export type Color = typeof COLOR[keyof typeof COLOR];

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

export interface BaseRequestReducerState<T> {
  value: T;
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
