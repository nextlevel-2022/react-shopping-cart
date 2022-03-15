# redux-saga 테스트!

redux-saga-test-plan 을 이용하는 체이닝을 통해 가독성도 얻을 수 있고, 선언적인 테스트 작성이 가능한 것 같다

## .provide 메서드

- provide 메서드를 이용해 아래와 같은 모킹을 할 수 있다.

```tsx
it('getProducts success', () => {
  return expectSaga(productsSaga)
    .withReducer(productsReducer)
    .dispatch(productsAsyncActions.getProductsAsyncAction.request())
    .provide([[call(productsRequest.getProducts), products]])
    .put(productsAsyncActions.getProductsAsyncAction.success({ products }))
    .run();
});
```

- `provide` 메서드는 matcher-key 쌍을 배열로 받는다.
- 각 matcher-key 쌍은 매칭할 이펙트와 이에 반환할 가짜 값을 엘리먼트로 가진 배열

  위 예에서는

    - 매칭할 이펙트: `call(productsRequest.getProducts)`
    - 반환할 가짝 값:  `products` (값 확인은 아래 토글 버튼 클릭)

- 매칭을 확인하고, `redux-saga`에 이펙트 처리를 넘기지 않고, 바로 가짜 값을 반환하도록 한다.
- 위 예시에서는 모든 `call 이펙트` 에 대해 `productsRequest.getProducts` 를 처리하는지 확인하고

  → 처리한다면 가짜 유저 목록 `products`  을 리턴하도록 한다.

## 이펙트 dispatching 과 fork 된 saga

```tsx
function* getProductsSaga(
  action: ReturnType<typeof productsAsyncActions.getProductsAsyncAction.request>,
) {
  try {
    const products: Product[] = yield call(productsRequest.getProducts);

    yield put(productsAsyncActions.getProductsAsyncAction.success({ products }));
  } catch (error) {
    yield put(productsAsyncActions.getProductsAsyncAction.failure({ error }));
  }
}

export default function* productsSaga() {
  const { getProductsAsyncAction } = productsAsyncActions;

  yield takeLatest(getProductsAsyncAction.request, getProductsSaga);
}
```

- `productsSaga` 는 `getProductsAsyncAction.request` 의 가장 마지막 액션을 처리하기 위해 `takeLatest`
- 만약 `getProductsAsyncAction.request` 를 디스패치하면 `redux-saga` 는 `productsSaga` 를 포크하고 액션을 넘김
- `productsSaga` 는 `action`에 담긴 `payload` 값을 이용해 적절한 작업 가능
- 이 처리를 `redux-saga-test-plan` 을 이용해 다음과 같이 테스트 가능

```tsx
it('getProducts success', () => {
  return expectSaga(productsSaga)
    .withReducer(productsReducer)
    .dispatch(productsAsyncActions.getProductsAsyncAction.request())
    .provide([[call(productsRequest.getProducts), products]])
    .put(productsAsyncActions.getProductsAsyncAction.success({ products }))
    .run();
});
```

- `redux-saga-test-plan` 은 fork 된 `saga`의 이펙트들도 모두 추적
- 위 예에서는 `expectSaga` 는 단지 `productsSaga` 만을 받았지만, `getProductsSaga`(`productsSaga`
  에서 `yield takeLatest(actoin, getProductsSaga)` 되는)가  `yield` 하는 `put` 이펙트도 테스트 한다는 것을
- `dispatch` 메서드를 통해 `getProductsAsyncAction.request` 액션을 `productsSaga`에 `dispatch` 했다
- action 에는 payload에 `id(42)` 를 지정했다
- `redux-saga` 는 이 action을 받아서 `productsSaga` 를 포크하고 실행했다
- takeLatest 는 루프로 동작하기 때문에 redux-saga-plan 은 경고 메시지와 함께 사가를 타임아웃 시킴.

  그러나 이미 타임 아웃을 예상하기 때문에 경고 메시지를 나타내지 않도록 silentRun 을 사용했다

- 일반적으로 saga 테스트에서는 run 을 사용해 경고 메시지를 확인하는 것이 옳다

## 에러처리

```tsx
function* getProductsSaga(
  action: ReturnType<typeof productsAsyncActions.getProductsAsyncAction.request>,
) {
  try {
    const products: Product[] = yield call(productsRequest.getProducts);

    yield put(productsAsyncActions.getProductsAsyncAction.success({ products }));
  } catch (error) {
    yield put(productsAsyncActions.getProductsAsyncAction.failure({ error }));
  }
}
```

providers 를 사가의 에러 처리 테스트를 위해 사용 할 수도 있음 .

```tsx
it('getProducts failure', () => {
  const error = new Error('something error');

  return expectSaga(productsSaga)
    .withReducer(productsReducer)
    .dispatch(productsAsyncActions.getProductsAsyncAction.request())
    .provide([[call(productsRequest.getProducts), throwError(error)]])
    .put(productsAsyncActions.getProductsAsyncAction.failure({ error }))
    .run();
});
```

## Redux의 상태(state) 테스트

- redux의 reducer 를 saga와 함께 테스트 가능
- 유저 목록을 받아 스토어의 상태를 업데이트하는 리듀서를 같이 테스트해보자

```tsx
const INITIAL_STATE = { users: [] };

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
```

`withReducer` 메서드를 사용해 리듀서에 연결하고 `hasFinalState` 를 사용해 최종 상태를 확인 가능

```tsx
const expectedResult = {
  [PRODUCTS]: { ...ProductsReducerInitialState.products, value: productsFixture },
};

return expectSaga(productsSaga)
  .withReducer(productsReducer)
  .dispatch(productsAsyncActions.getProductsAsyncAction.request())
  .provide([[call(productsRequest.getProducts), productsFixture]])
  .hasFinalState(expectedResult)
  .run();
})
;
```
