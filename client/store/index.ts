import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
// eslint-disable-next-line import/named
import createSagaMiddleware, { Task } from 'redux-saga';

import { AppDispatch } from '../shared/types';
import { persistedRootReducer, rootSaga } from './modules';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const createApplyMiddlewareFunction = () => {
    if (process.env.NODE_ENV === 'test') {
      return applyMiddleware(sagaMiddleware);
    }

    return applyMiddleware(sagaMiddleware, logger);
  };

  const store = createStore(
    persistedRootReducer,
    composeWithDevTools(createApplyMiddlewareFunction()),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const store = makeStore();
const persistor = persistStore(store);

export const wrapper = createWrapper(makeStore, { debug: true });
export { persistor, store };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;
// : TypedUseSelectorHook<RootState>
