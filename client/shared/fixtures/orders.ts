import { OrderDetail, OrderItem } from '../types';
import { product } from './product';

export const orders: OrderItem[] = [
  {
    id: 1,
    orderDetails: [
      { product, quantity: 1 },
      { product, quantity: 1 },
    ],
  },
];
