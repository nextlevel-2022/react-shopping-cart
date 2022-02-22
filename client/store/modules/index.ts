import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { productsReducer } from './products/slice';
import { PRODUCTS } from './products/types';
import { all } from '@redux-saga/core/effects';
import productsSaga from './products/saga';

const rootPersistConfig = {
  key: 'root',
  storage,
  // whitelist: [PRODUCTS],
};

export const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        [PRODUCTS]: productsReducer,
      });

      return combinedReducer(state, action);
    }
  }
};

export function* rootSaga() {
  yield all([productsSaga()]);
}

export const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);
