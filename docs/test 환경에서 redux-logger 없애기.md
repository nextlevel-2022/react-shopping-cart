## 🔹 test 환경에서 redux-logger 없애기

옆에 watch 모드를 살짝 보이게해서 TDD 노력하고 있는데 redux-logger가 찍혀 매번 스크롤을 내려야하더라구요. 이 부분 걸리적거리시면 test 환경 때 미들웨어 다르게 넣을 수 있으니 참고하세요!

<img src="https://user-images.githubusercontent.com/44131043/155138571-12310a74-f50b-4623-990b-dde570b3eecd.jpg" width="600px">


```
export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const createApplyMiddleware = () => {
    if (process.env.NODE_ENV === 'test') {
      return applyMiddleware(sagaMiddleware);
    }

    return applyMiddleware(sagaMiddleware, logger);
  };

  const store = createStore(persistedRootReducer, composeWithDevTools(createApplyMiddleware()));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
```
