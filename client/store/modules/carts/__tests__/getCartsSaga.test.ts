import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import cartsRequest from '../../../../apis/carts';
import { cartsFromServerDB } from '../../../../shared/fixtures/cartsFromServer';
import { cartsReducerInitialState } from '../../../../shared/fixtures/cartsReducerInitialState';
import { cartsWithQuantity } from '../../../../shared/fixtures/cartsWithQuantity';
import cartsSaga from '../saga';
import { cartsActions, cartsReducer } from '../slice';
import { CARTS } from '../types';

describe('getCartsSaga', () => {
  it('store의 state는 초깃값을 가지고 있다.', () => {
    return expectSaga(cartsSaga).withReducer(cartsReducer).hasFinalState(cartsReducerInitialState).silentRun();
  });

  it('getCarts success 시 carts 상태를 저장 할 수 있다.', () => {
    const expectedResult = {
      selectedProducts: [],
      [CARTS]: { ...cartsReducerInitialState.carts, value: cartsWithQuantity },
    };

    return expectSaga(cartsSaga)
      .withReducer(cartsReducer)
      .dispatch(cartsActions.getCarts.request())
      .provide([[call(cartsRequest.getCarts), cartsFromServerDB]])
      .put(cartsActions.getCarts.success({ [CARTS]: cartsFromServerDB }))
      .hasFinalState(expectedResult)
      .silentRun();
  });

  it('getCarts failure', () => {
    const error = new Error('something error');

    return expectSaga(cartsSaga)
      .withReducer(cartsReducer)
      .dispatch(cartsActions.getCarts.request())
      .provide([[call(cartsRequest.getCarts), throwError(error)]])
      .put(cartsActions.getCarts.failure({ error }))
      .silentRun();
  });
});
