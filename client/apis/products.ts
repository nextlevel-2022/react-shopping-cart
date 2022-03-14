import { REQUEST } from '../shared/constants/url';
import { Product } from '../shared/types';
import { fetcher } from '../shared/utils/fetcher';

const productsRequest = {
  getProducts: async () => {
    const { method, url } = REQUEST.GET_PRODUCTS();

    return await fetcher(method, url);
  },

  getProductById: async (productId: Product['id']) => {
    const { method, url } = REQUEST.GET_PRODUCT_BY_ID(productId);

    return await fetcher(method, url);
  },
};

export default productsRequest;
