import { all } from '@redux-saga/core/effects';
import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartsSaga from './carts/saga';
import { cartsReducer } from './carts/slice';
import { CARTS } from './carts/types';
import ordersSaga from './orders/saga';
import { ordersReducer } from './orders/slice';
import { ORDERS } from './orders/types';
import productsSaga from './products/saga';
import { productsReducer } from './products/slice';
import { PRODUCTS } from './products/types';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [CARTS],
};

export const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        [PRODUCTS]: productsReducer,
        [CARTS]: cartsReducer,
        [ORDERS]: ordersReducer,
      });

      return combinedReducer(state, action);
    }
  }
};

export function* rootSaga() {
  yield all([productsSaga(), cartsSaga(), ordersSaga()]);
}

export const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);
