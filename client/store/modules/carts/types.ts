import { BaseRequestReducerState, CartItem, Product } from '../../../shared/types';

export const CARTS = 'carts';

export interface GetCartsSuccessPayload {
  carts: Omit<CartItem, 'quantity'>[];
}

export interface DeleteCartItemRequestPayload {
  idToDeleteCartItem: CartItem['id'];
}

export interface DeleteCartItemSuccessPayload {
  deletedCartItemId: CartItem['id'];
}

export interface CartsReducerState {
  selectedProducts: Product[];
  carts: BaseRequestReducerState<CartItem[]>;
}

export interface AddCartItemRequestPayload {
  product: Product;
}

export interface AddCartItemSuccessPayload {
  newCartItemProduct: Product;
}

export interface PostOrdersRequestPayload {
  newOrderDetails: OrderDetail[];
}

export interface PostOrdersSuccessPayload {
  newOrderDetails: OrderDetail[];
}
