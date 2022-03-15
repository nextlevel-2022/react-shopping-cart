## 🔹 payload 타입 지정, 설계에 대한 고민

`(1)`

```tsx
interface GetProductsResponseType {
  products: Product[];
}

const getProductsAsyncAction = createAsyncAction(
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
)<void, GetProductsResponseType, AxiosError>();
```

`(2)`

```tsx
interface GetProductsResponseType {
  [products: string]: Product[];
}

const getProductsAsyncAction = createAsyncAction(
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
)<void, GetProductsResponseType, AxiosError>();
```

처음에는 1번처럼 작업하니

```tsx
function* getProductsSaga(
  action: ReturnType<typeof productsAsyncActions.getProductsAsyncAction.request>,
) {
  try {
    const products: Product[] = yield call(productsRequest.getProducts);

    yield put(productsAsyncActions.getProductsAsyncAction.success(products));
  } catch (error: any) {
    yield put(productsAsyncActions.getProductsAsyncAction.failure(error));
    console.error(error);
  }
}
```

`yield put(productsAsyncActions.getProductsAsyncAction.success(products));` 와 같이 작업했다. payload에 products 단일로만 넣어줄 수 있었던
것. 만약 다른 걸 추가로 넣어주는 상황이 발생하면 대응하기 힘들 것 같다고 생각해, 2번처럼 변경하고 →

`yield put(productsAsyncActions.getProductsAsyncAction.success({ products }));`

객체로 전달해주었다.
