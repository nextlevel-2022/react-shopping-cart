import { createSelector } from 'reselect';

import { transformOrderDetailFromCartItem } from '../../service/cartsService';
import { BaseRequestReducerState, CartItem, OrderItem, RootState } from '../../shared/types';
import { createModelAttributeObject, createModelAttributeSelector } from '../../shared/utils/redux';
import { useAppDispatch } from '../../store';
import { ordersActions } from '../../store/modules/orders/slice';
import { OrderItemFromServer, ORDERS } from '../../store/modules/orders/types';

const useOrders = () => {
  const dispatch = useAppDispatch();

  const selfSelector = (state: RootState) => state[ORDERS];
  const ordersModelSelector = createSelector(
    selfSelector,
    (state): BaseRequestReducerState<OrderItemFromServer[]> => state.orders,
  );

  const ordersAttributeSelector = createModelAttributeSelector(ordersModelSelector);

  const {
    value: orders,
    isLoading: isLoadingOrders,
    hasError: hasErrorOrders,
    error: errorOrders,
  } = createModelAttributeObject<OrderItem[]>(ordersAttributeSelector);

  const getOrders = () => {
    dispatch(ordersActions.getOrders.request());
  };

  return {
    orders,
    isLoadingOrders,
    hasErrorOrders,
    errorOrders,
    getOrders,
  };
};

export default useOrders;
