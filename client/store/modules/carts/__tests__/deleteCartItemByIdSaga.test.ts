import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { useDispatch, useSelector } from '../../../../__mocks__/react-redux';
import cartsRequest from '../../../../service/apis/carts';
import { cartsReducerInitialState } from '../../../../shared/fixtures/cartsReducerInitialState';
import { useAppDispatch, useAppSelector } from '../../../index';
import cartsSaga from '../saga';
import { cartsActions, cartsReducer } from '../slice';

describe('deleteCartItemByIdSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('store의 state는 초깃값을 가지고 있다.', () => {
    return expectSaga(cartsSaga).withReducer(cartsReducer).hasFinalState(cartsReducerInitialState).silentRun();
  });

  it('deleteCartItemByIdSaga success', () => {
    const ID_TO_DELETE_CART_ITEM = 1;

    return expectSaga(cartsSaga)
      .withReducer(cartsReducer)
      .dispatch(cartsActions.deleteCartItemById.request({ idToDeleteCartItem: ID_TO_DELETE_CART_ITEM }))
      .provide([[call(cartsRequest.deleteCartItemById, ID_TO_DELETE_CART_ITEM), {}]])
      .put(cartsActions.deleteCartItemById.success({ deletedCartItemId: ID_TO_DELETE_CART_ITEM }))
      .silentRun();
  });

  it('deleteCartItemByIdSaga failure', () => {
    const ID_TO_DELETE_CART_ITEM = 1;

    const error = new Error('something error');

    return expectSaga(cartsSaga)
      .withReducer(cartsReducer)
      .dispatch(cartsActions.deleteCartItemById.request({ idToDeleteCartItem: ID_TO_DELETE_CART_ITEM }))
      .provide([[call(cartsRequest.deleteCartItemById, ID_TO_DELETE_CART_ITEM), throwError(error)]])
      .put(cartsActions.deleteCartItemById.failure({ error }))
      .silentRun();
  });
});
