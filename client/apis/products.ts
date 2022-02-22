import { REQUEST } from '../shared/constants/url';
import { fetcher } from '../shared/utils/fetcher';

interface GetProductsResponseType {
  products: any;
}

const productsService = {
  getProducts: async () => {
    const { method, url } = REQUEST.GET_PRODUCTS();

    return await fetcher(method, url);
  },
};

export default productsService;
