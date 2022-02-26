import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import productsService from '../../../../apis/products';
import db from '../../../../shared/fixtures/db.json';
import { productsActions, productsReducer, ProductsReducerInitialState } from '../slice';
import productsSaga from '../saga';
import { PRODUCTS } from '../types';

const { products: productsFixture } = db;

describe('productsSaga', () => {
  it('store의 state는 초깃값을 가지고 있다.', () => {
    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .hasFinalState(ProductsReducerInitialState)
      .silentRun();
  });

  it('getProducts success.', () => {
    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .dispatch(productsActions.getProductsAsyncAction.request())
      .provide([[call(productsService.getProducts), productsFixture]])
      .put(productsActions.getProductsAsyncAction.success({ [PRODUCTS]: productsFixture }))
      .silentRun();
  });

  it('getProducts failure.', () => {
    const error = new Error('something error');

    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .dispatch(productsActions.getProductsAsyncAction.request())
      .provide([[call(productsService.getProducts), throwError(error)]])
      .put(productsActions.getProductsAsyncAction.failure({ error }))
      .silentRun();
  });

  it('store의 state에 받아온 products 상태를 저장 할 수 있다.', () => {
    const expectedResult = {
      [PRODUCTS]: { ...ProductsReducerInitialState.products, value: productsFixture },
    };

    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .dispatch(productsActions.getProductsAsyncAction.request())
      .provide([[call(productsService.getProducts), productsFixture]])
      .hasFinalState(expectedResult)
      .silentRun();
  });
});
