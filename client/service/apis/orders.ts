import { REQUEST } from '../../shared/constants/url';
import { OrderDetail } from '../../shared/types';
import { fetcher } from '../../shared/utils/fetcher';
import { OrderDetailFromServer, OrderItemFromServer } from '../../store/modules/orders/types';
import { createRefinedOrders } from '../ordersService';

const ordersRequest = {
  getOrders: async () => {
    const { method, url } = REQUEST.GET_ORDERS();

    const orders: OrderItemFromServer[] = await fetcher(method, url);

    return createRefinedOrders(orders);
  },

  addOrderItem: async (newOrderDetails: OrderDetail[]) => {
    const { method, url } = REQUEST.POST_ORDER();

    const orderDetails: OrderDetailFromServer[] = newOrderDetails.map(({ product, quantity }) => {
      return { ...product, quantity };
    });

    return await fetcher(method, url, { orderDetails });
  },
};

export default ordersRequest;
