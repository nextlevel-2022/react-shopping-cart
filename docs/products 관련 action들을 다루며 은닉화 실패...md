# 🔶 해결하지 못한 것

## products 관련 action들을 다루며 은닉화 실패..

<img src="https://user-images.githubusercontent.com/44131043/155141754-1f4ddc17-bc1f-4bd1-8e83-5371dded93c5.jpg" width="300px">

- RTK를 사용해서 `createSlice` 를 통해 reducer 작업
- redux와 관련된 대부분의 것들은 위와 같은 디렉토리 구조로 관리
    - (redux 관련 유틸, 타입은 shared 디렉토리에 있음)

여기서 1차 고민

- slice에 action 만들어 주는 부분도 포함해야 할까?
    - 그럼 코드 라인이 너무 길어져 보기 어려울 것 같음(action, reducer, initialState 모두 한 파일에 있음)

위와 같은 이유로 비동기 액션 부분만 `asyncActions.ts` 로 분리했다..

```tsx
// client/modules/products/asyncActions.ts 
 
const GetProductsActionType = {
  GET_PRODUCTS: `${PRODUCTS}/GET_${PRODUCTS}`,
  GET_PRODUCTS_SUCCESS: `${PRODUCTS}/GET_${PRODUCTS}_SUCCESS`,
  GET_PRODUCTS_FAILURE: `${PRODUCTS}/GET_${PRODUCTS}_FAILURE`,
} as const;

const getProductsAsyncAction = createAsyncAction(
  GetProductsActionType.GET_PRODUCTS,
  GetProductsActionType.GET_PRODUCTS_SUCCESS,
  GetProductsActionType.GET_PRODUCTS_FAILURE,
)<void, GetProductsResponseType, GetProductsErrorType>();

export const productsAsyncActions = { getProductsAsyncAction };
```

- 하나의 request에 관한 action 작업인데 나름 방대함

  → 유틸로 분리해서 action 관련 작업을 간소화하고 slice와 같이 둬보자!

  → 그런데 유틸함수가 너무 사용하기 어려워짐 → 계속 내부 구조를 살펴보고 타입을 힘들게 맞춰주게 됨
  → 이러한 이유로 간소화 포기...

  **→ 그냥 비동기와 관련된 액션들은 `asyncActions.ts` 에 따로 관리하기로 타협**


그런데 여기서 큰 문제가 발생했다...

```tsx
비동기 관련 액션인 productsAsyncActions 를 export 하고 있다는 것(이곳에 여러 방법으로 접근 가능하다는 것) 
```

```tsx
export const productsSlice = createSlice({
  name: PRODUCTS,
  initialState: ProductsReducerInitialState,
  reducers: {},
  extraReducers: (builder) => {
			// something code ...
  },
});

export const productsActions = { ...productsSlice.actions, ...productsAsyncActions };
```

이렇게 작성하고 export 해준 것을 slice에서 import 해와
`const productsActions = { ...productsSlice.actions, ...productsAsyncActions };`
로 묶고 있다. 그리고 또  `productsActions` 를 export 하고 있다는 것.. 이말은 즉!

1. `productsAsyncActions.getProductsAsyncAction.request`
2. `productsActions.getProductsAsyncAction.request`

이렇게 두 방법 모두 `getProductsAsyncAction.request` 에 접근 할 수 있다. IDE의 자동완성, 실수 등으로 어떨 때는 1번, 어떨 때는 2번으로 `getProductsAsyncAction.request` 에 접근한다면 나중에 수정이 일어나거나 했을 때 큰 문제가 생길 수 있을 것 같다.

그래도 action 들을 slice에 같이 두기에는 너무 양이 많아질 것 같아 분리한 상태로 유지하기로 했다.
그러나 이건 꼭 해결해야할 것 같다.... 어떤 방법이 있을까? 우선 생각나는 건

- asyncAction과 그 외의 action 따로 사용(ex. `productAsyncAction`, `productsAcitonWithoutAsync`)

  → 이렇게하면 products 와 관련된 액션들이 하나로 관리되지 못해 수정하거나 할 때 불편할 수 있을 것 같음


- slice에 action 만들어주는 부분 같이 두기

  → 이렇게하면 너무 길어질 것 같아.... 그래도 차라리 코드 라인이 길어지고 안정성을 찾는게 좋을 것 같기도 하다...


이렇게 고민하고있는데 그냥 코드라인이 길어지더라도 같이 두고, 감춰서 하나의 객체로만 접근 할 수 있도록 하는게 안정성에 크게 기여 할 수 있을 것 같다! 조금 더 고민해보고 step2에 반영하자.
