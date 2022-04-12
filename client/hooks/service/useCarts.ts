import { createSelector } from 'reselect';

import {
  hasSameProductInCarts,
  isMaxCartItemQuantity,
  isMinCartItemQuantity,
  MAX_CART_ITEM_QUANTITY,
  MIN_CART_ITEM_QUANTITY,
} from '../../service/cartsService';
import { ALERT_MESSAGE } from '../../shared/constants/message';
import { BaseRequestReducerState, CartItem, Product, RootState } from '../../shared/types';
import { createModelAttributeObject, createModelAttributeSelector } from '../../shared/utils/redux';
import { useAppDispatch } from '../../store';
import { cartsActions } from '../../store/modules/carts/slice';
import { CARTS } from '../../store/modules/carts/types';

const useCarts = () => {
  const dispatch = useAppDispatch();

  const selfSelector = (state: RootState) => state[CARTS];
  const cartsModelSelector = createSelector(selfSelector, (state): BaseRequestReducerState<CartItem[]> => state.carts);

  const cartsAttributeSelector = createModelAttributeSelector(cartsModelSelector);

  const {
    value: carts,
    isLoading: isLoadingCarts,
    hasError: hasErrorCarts,
    error: errorCarts,
  } = createModelAttributeObject<CartItem[]>(cartsAttributeSelector);

  const getCarts = () => {
    dispatch(cartsActions.getCarts.request());
  };

  const addCarts = (product: Product) => {
    if (hasSameProductInCarts(carts, product)) {
      return alert(ALERT_MESSAGE.ALREADY_EXIST_CART_ITEM);
    }
    dispatch(cartsActions.addCartItem.request({ product }));

    alert(ALERT_MESSAGE.ADD_CART_SUCCESS);
  };

  const increaseCartItemQuantityById = (cartItemId: CartItem['id'], currentQuantity: CartItem['quantity']) => {
    if (isMaxCartItemQuantity(currentQuantity, MAX_CART_ITEM_QUANTITY)) {
      return alert(ALERT_MESSAGE.MAX_CART_ITEM_QUANTITY);
    }

    dispatch(cartsActions.increaseCartItemQuantityById({ cartItemId }));
  };

  const decreaseCartItemQuantityById = (cartItemId: CartItem['id'], currentQuantity: CartItem['quantity']) => {
    if (isMinCartItemQuantity(currentQuantity, MIN_CART_ITEM_QUANTITY)) {
      return alert(ALERT_MESSAGE.MIN_CART_ITEM_QUANTITY);
    }

    dispatch(cartsActions.decreaseCartItemQuantityById({ cartItemId }));
  };

  const deleteCartItemById = (idToDeleteCartItem: CartItem['id']) => {
    dispatch(cartsActions.deleteCartItemById.request({ idToDeleteCartItem }));
  };

  return {
    carts,
    isLoadingCarts,
    hasErrorCarts,
    errorCarts,
    getCarts,
    increaseCartItemQuantityById,
    decreaseCartItemQuantityById,
    deleteCartItemById,
    addCarts,
  };
};

export default useCarts;
