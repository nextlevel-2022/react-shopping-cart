import { REQUEST } from '../shared/constants/url';
import { CartItem, Product } from '../shared/types';
import { fetcher } from '../shared/utils/fetcher';

const cartsRequest = {
  getCarts: async () => {
    const { method, url } = REQUEST.GET_CARTS();

    return await fetcher(method, url);
  },

  deleteCartItemById: async (idToDeleteCartItem: CartItem['id']) => {
    const { method, url } = REQUEST.DELETE_CART_BY_ID(idToDeleteCartItem);

    return await fetcher(method, url);
  },

  addCartItem: async (product: Product) => {
    const { method, url } = REQUEST.POST_CART();

    return await fetcher(method, url, { product });
  },
};

export default cartsRequest;
