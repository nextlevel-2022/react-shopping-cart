import { call } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { useDispatch, useSelector } from '../../../../__mocks__/react-redux';
import productsRequest from '../../../../service/apis/products';
import db from '../../../../shared/fixtures/db.json';
import { useAppDispatch, useAppSelector } from '../../../index';
import productsSaga from '../saga';
import { productsActions, productsReducer } from '../slice';
import { PRODUCTS } from '../types';

const { products: productsFixture } = db;

const ProductsReducerInitialState = {
  products: {
    value: [],
    isLoading: false,
    hasError: false,
    error: null,
  },
};

describe('productsSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('store의 state는 초깃값을 가지고 있다.', () => {
    return expectSaga(productsSaga).withReducer(productsReducer).hasFinalState(ProductsReducerInitialState).silentRun();
  });

  it('getProducts success.', () => {
    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .dispatch(productsActions.getProductsAsyncAction.request())
      .provide([[call(productsRequest.getProducts), productsFixture]])
      .put(productsActions.getProductsAsyncAction.success({ [PRODUCTS]: productsFixture }))
      .silentRun();
  });

  it('getProducts failure.', () => {
    const error = new Error('something error');

    return expectSaga(productsSaga)
      .withReducer(productsReducer)
      .dispatch(productsActions.getProductsAsyncAction.request())
      .provide([[call(productsRequest.getProducts), throwError(error)]])
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
      .provide([[call(productsRequest.getProducts), productsFixture]])
      .hasFinalState(expectedResult)
      .silentRun();
  });
});
