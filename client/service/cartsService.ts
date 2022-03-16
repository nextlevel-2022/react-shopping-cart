import { CartItem, OrderDetail, Product } from '../shared/types';

export const isMaxCartItemQuantity = (currentQuantity: CartItem['quantity']): boolean => {
  const MAX_CART_ITEM_QUANTITY = 20;

  return MAX_CART_ITEM_QUANTITY === currentQuantity;
};

export const isMinCartItemQuantity = (currentQuantity: CartItem['quantity']): boolean => {
  const MIN_CART_ITEM_QUANTITY = 1;

  return MIN_CART_ITEM_QUANTITY === currentQuantity;
};

export const hasSameProductInCarts = (carts: CartItem[], newProduct: Product): boolean => {
  return carts.findIndex(({ product }) => product.id === newProduct.id) >= 0;
};

export const transformOrderDetailFromCartItem = (cartItems: CartItem[]): OrderDetail[] => {
  return cartItems.map(({ product, quantity }) => ({ product, quantity }));
};
