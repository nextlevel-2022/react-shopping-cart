import { BaseRequestReducerState, OrderItem, Product } from '../../../shared/types';

export const ORDERS = 'orders';

export interface GetOrdersSuccessPayload {
  orders: OrderItem[];
}

export interface OrdersReducerState {
  orders: BaseRequestReducerState<OrderItem[]>;
}

// from server
export interface OrderDetailFromServer extends Product {
  quantity: number;
}

export interface OrderItemFromServer {
  id: number;
  orderDetails: OrderDetailFromServer[];
}
