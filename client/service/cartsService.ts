import { CartItem, OrderDetail, Product } from '../shared/types';

export const isMaxCartItemQuantity = (currentQuantity: CartItem['quantity']): boolean => {
  const MAX_CART_ITEM_QUANTITY = 20;

export const isMaxCartItemQuantity = (
  currentQuantity: CartItem['quantity'],
  maxCartItemQuantity: CartItem['quantity'],
): boolean => {
  return maxCartItemQuantity === currentQuantity;
};

export const isMinCartItemQuantity = (
  currentQuantity: CartItem['quantity'],
  minCartItemQuantity: CartItem['quantity'],
): boolean => {
  return minCartItemQuantity === currentQuantity;
};

export const hasSameProductInCarts = (carts: CartItem[], newProduct: Product): boolean => {
  return carts.findIndex(({ product }) => product.id === newProduct.id) >= 0;
};

export const transformOrderDetailFromCartItem = (cartItems: CartItem[]): OrderDetail[] => {
  return cartItems.map(({ product, quantity }) => ({ product, quantity }));
};

export const calculateExpectedPrice = (selectedCartItems: CartItem[]) => {
  const PRICE_WHEN_SELECTED_NOTHING = 0;

  return selectedCartItems.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    PRICE_WHEN_SELECTED_NOTHING,
  );
};
