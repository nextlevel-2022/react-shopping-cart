import { CartItem } from '../types';

/**utils*/
export const createCartItem = (id: CartItem['id'] = 1, quantity: CartItem['quantity'] = 1) => ({
  id,
  quantity,
  product: {
    name: '호떡',
    price: 21800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
  },
});

export const createCartsReducerStateHasValue = (value: CartItem[]) => ({
  selectedProducts: [],
  carts: {
    value,
    isLoading: false,
    hasError: false,
    error: null,
  },
});
