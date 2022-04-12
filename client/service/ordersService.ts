import { OrderDetail, OrderItem } from '../shared/types';
import { OrderDetailFromServer, OrderItemFromServer } from '../store/modules/orders/types';

export const createRefinedOrders = (originalOrders: OrderItemFromServer[]): OrderItem[] =>
  originalOrders.map(({ id, orderDetails }) => ({
    id,
    orderDetails: divideProductAndQuantity(orderDetails),
  }));

export const divideProductAndQuantity = (originalOrderDetail: OrderDetailFromServer[]): OrderDetail[] => {
  return originalOrderDetail.map((orderItem) => {
    const { id, name, price, imageUrl, quantity } = orderItem;

    return {
      product: { id, name, price, imageUrl },
      quantity,
    };
  });
};

export const getTotalOrderItemNumber = (orders: OrderItem[]): number =>
  orders.reduce((acc, orderItem) => {
    return orderItem.orderDetails.length + acc;
  }, 0);

export const getTotalOrderAmount = (orders: OrderItem[]): number => {
  return orders
    .map((orderItem) => orderItem.orderDetails)
    .reduce(
      (totalAcc, cur) =>
        cur.reduce((oneOrderItemAcc, { product, quantity }) => {
          return oneOrderItemAcc + product.price * quantity;
        }, totalAcc),
      0,
    );
};
