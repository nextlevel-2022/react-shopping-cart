import { REQUEST } from '../shared/constants/url';
import { OrderDetail, OrderItem } from '../shared/types';
import { fetcher } from '../shared/utils/fetcher';
import { OrderDetailFromServer, OrderItemFromServer } from '../store/modules/orders/types';

const ordersRequest = {
  getOrders: async () => {
    const { method, url } = REQUEST.GET_ORDERS();

    const orders: OrderItemFromServer[] = await fetcher(method, url);

    return createRefinedOrders(orders);
  },
};

export default ordersRequest;

/** utils */
const createRefinedOrders = (originalOrders: OrderItemFromServer[]): OrderItem[] =>
  originalOrders.map(({ id, orderDetails }) => ({
    id,
    orderDetails: divideProductAndQuantity(orderDetails),
  }));

const divideProductAndQuantity = (originalOrderDetail: OrderDetailFromServer[]): OrderDetail[] => {
  return originalOrderDetail.map((orderItem) => {
    const { id, name, price, imageUrl, quantity } = orderItem;

    return {
      product: { id, name, price, imageUrl },
      quantity,
    };
  });
};
