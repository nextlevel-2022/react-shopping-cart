import { createSelector } from 'reselect';

import { BaseRequestReducerState, Product, RootState } from '../../shared/types';
import { createModelAttributeObject, createModelAttributeSelector } from '../../shared/utils/redux';
import { useAppDispatch } from '../../store';
import { productsActions } from '../../store/modules/products/slice';
import { PRODUCTS } from '../../store/modules/products/types';

const useProducts = () => {
  const dispatch = useAppDispatch();

  const selfSelector = (state: RootState) => state[PRODUCTS];
  const productsModelSelector = createSelector(
    selfSelector,
    (state): BaseRequestReducerState<Product[]> => state.products,
  );

  const productsAttributeSelector = createModelAttributeSelector(productsModelSelector);

  const {
    value: products,
    isLoading: isLoadingProducts,
    hasError: hasErrorProducts,
    error: errorProducts,
  } = createModelAttributeObject<Product[]>(productsAttributeSelector);

  const getProducts = () => {
    dispatch(productsActions.getProductsAsyncAction.request());
  };

  return {
    products,
    isLoadingProducts,
    hasErrorProducts,
    errorProducts,
    getProducts,
  };
};

export default useProducts;
