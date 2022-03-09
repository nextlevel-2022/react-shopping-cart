import { REQUEST } from '../shared/constants/url';
import { fetcher } from '../shared/utils/fetcher';

const ordersService = {
  getOrders: async () => {
    const { method, url } = REQUEST.GET_ORDERS();

    return await fetcher(method, url);
  },
};

export default ordersService;
