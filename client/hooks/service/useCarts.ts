import { createSelector } from 'reselect';

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
    dispatch(cartsActions.addCartItem.request({ product }));
  };

  const increaseCartItemQuantityById = (cartItemId: CartItem['id'], currentQuantity: CartItem['quantity']) => {
    const MAX_CART_ITEM_QUANTITY = 20;

    if (MAX_CART_ITEM_QUANTITY === currentQuantity) return alert('최대 수량입니다.');

    dispatch(cartsActions.increaseCartItemQuantityById({ cartItemId }));
  };

  const decreaseCartItemQuantityById = (cartItemId: CartItem['id'], currentQuantity: CartItem['quantity']) => {
    const MIN_CART_ITEM_QUANTITY = 1;

    if (MIN_CART_ITEM_QUANTITY === currentQuantity) return alert('최소 수량입니다.');

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
