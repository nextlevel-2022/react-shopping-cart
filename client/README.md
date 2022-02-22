# 장바구니 미션

```tsx
const IntroduceStudents = {
	hong: (): string => 'hello Im hong',
	kim: (): string => 'hello Im kim',
	kang: (): string => 'hello Im kang',
};
```

# 🔶 초기 셋팅

## 🔹 yarn add

```
yarn add 
redux-saga 
next-redux-saga 

redux 
react-redux 
next-redux-wrapper  
react-redux-loading-bar 
redux-devtools-extension 
@types/redux-logger 

redux-persist redux-logger 

@reduxjs/toolkit

typesafe-actions

yarn add redux-saga next-redux-saga redux react-redux next-redux-wrapper  react-redux-loading-bar redux-devtools-extension redux-persist redux-logger @types/redux-logger @reduxjs/toolkit typesafe-actions
```

```
yarn add -D

@types/next-redux-wrapper
@types/react-redux
@types/redux

yarn add -D @types/next-redux-wrapper @types/react-redux @types/redux
```

[https://github.com/samgowda/next-app-custom-boilerplate/blob/master/src/redux/store.ts](https://github.com/samgowda/next-app-custom-boilerplate/blob/master/src/redux/store.ts)

# 🔶 해결하지 못한 것

## 은닉화 실패..

![Screen Shot 2022-02-22 at 7.01.19 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69d29b6b-32d0-4b48-8125-9b4febb4292a/Screen_Shot_2022-02-22_at_7.01.19_PM.jpg)

redux와 관련된 대부분의 것들은 위와 같은 디렉토리 구조로 관리했다(redux 관련 유틸, 타입은 shared 디렉토리에 있음). 위에 보면 알 수 있듯이 RTK를 사용해서 `createSlice` 를 통해 reducer 작업을 해줬다. 우선 여기서 1차적인 고민이 나타났다. action 타입에 관련된 작업을 slice와 같은 부분에 둬야할까?

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

하나의 request에 관한 action 작업인데 나름 방대하다. 유틸로 분리해보려고 했으나 뭔가 복잡하고, 더 사용하기 어려워지는 느낌이 있어 우선 보류했는데 그렇다보니 양이 적지 않다. 그래서 slice에 두니 코드 라인이 너무 길어지고, 역할 분리가 잘 되어있는 것 같지 않아 비동기와 관련된 액션들은 `asyncActions.ts` 에 따로 관리하기 시작했다. 그런데 여기서 매우 큰 문제가 나타났다. **비동기 관련 액션인 `productsAsyncActions` 를 export 하고 있다는 것.**

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

그리고 export 해준 것을 slice에서 import 해와 `const productsActions = { ...productsSlice.actions, ...productsAsyncActions };` 로 묶고 있다. 그리고 또  `productsActions` 를 export 하고 있다는 것.. 이말은즉슨

1. `productsAsyncActions.getProductsAsyncAction.request`
2. `productsActions.getProductsAsyncAction.request`

이렇게 두 방법 모두 `getProductsAsyncAction.request` 에 접근 할 수 있다. IDE의 자동완성, 실수 등으로 어떨 때는 1번, 어떨 때는 2번으로 `getProductsAsyncAction.request` 에 접근한다면 나중에 수정이 일어나거나 했을 때 큰 문제가 생길 수 있다고 생각한다.

그래도 action 들을 slice에 같이 두기에는 너무 양이 많아질 것 같아 분리한 상태로 유지하기로 했다. 그러나 이건 꼭 해결해야할 것 같다.

# 🔶 고민과 시도해본 것

## 🔹  TDD

이번에는 꼭 TDD를 해보자 생각해서 ProductsList 관련 부분만 맛보기로 진행해봤다. 우선 watch 모드로 성공 실패만 보이게 살짝해두며 작업을 했다.

- [ ]  <ProductListContainer /> 가 렌더된다.
- [ ]  서버에서 받아온 `<ProductListContainer />` 에서 products 값을 `<ProductList products={products} />`  이런 식으로 넘겨준다.
- [ ]  `<ProductList products={products} />` 가 렌더되면 products의 값들이 보인다.
- [ ]  `<ProductList products={products} />` 에서 주입 받은 products 의 길이가 0 이라면 → 상품 정보가 없다는 것을 알린다.

이 부분을 먼저 작성했고, TDD를 진행하며

- [ ]  <ProductListContainer /> 에서 처음에는 로딩중 화면을 보여준다

이 항목을 추가했다.

우선

```tsx
it('처음에는 로딩중인 상태이므로 로딩중임을 보인다.',  () => {
    const result = render(<ProductListContainer />);

    expect(result.getByText('ProductListContainer'));
  });
```

이 부분을 추가했는데 이 부분은 해결할 수 없었다. 처음에 당연히 `<ProductListContainer />` 를 렌더링하면서 ProductListContainer 텍스트를 확인함을 통해 렌더링 결과를 보려고 했다. 그러나 로딩중인 경우

```tsx
if (isLoading) return <div>로딩중</div>;
```

이 부분 때문에 계속 로딩중만 나타났다. 그래서 아래 로딩 상태를 테스트하는 부분을 추가했다.

```tsx
describe('ProductsListContainer 가 렌더 된다.', () => {
  it('처음에는 로딩중인 상태이므로 로딩중임을 보인다.', async () => {
    const result = render(<ProductListContainer />);

		expect(result.getByText('로딩중'));  });
});
```

이 부분은 TDD로 진행하지 않고, 위에서 실패한 결과를 보고 작성했다.

그리고 FEConf2020 TDD 세션에서 본 것과 비슷한 부분을 작성했다. 이 부분은 예제로 확인해 자신있게 작성했다.

```tsx
import { products } from '../../../shared/fixtures/db.json';

describe('<ProductList/> 제품들이 보이는 컴포넌트', () => {
  describe('products 가 존재 할 때(배열 안에 product 들이 있을 때)', () => {

    it('products 들이 화면에 보인다.', () => {
      const result = render(<ProductList products={products} />);

      expect(result.getByText('냉면용기(대)'));
      expect(result.getByText('생새우살 (71/90) 500g 4개'));
    });
  });

  describe('products가 존재하지 않을 때 ', () => {
    it('products가 존재하지 않을 때 "등록된 제품이 없습니다" 가 나타난다.', () => {
      const result = render(<ProductList products={[]} />);

      expect(result.getByText('등록된 제품이 없습니다.'));
    });
  });
});
```

getByText(냉면용기, 생새우살...) 하는 부분은 미리 db.json 을 확인해 값을 가져왔고,

```tsx
const ProductList = ({ products }: Props) => {
  return (
    <Container>
      <ProductListContainer>
        {products.map((product) => {
          return <ProductItem key={`product-${product.id}`} product={product} />
        })}
      </ProductListContainer>
    </Container>
  );
};
```

받아온 products 배열을 map으로 `<ProductItem product={product} />`  을 통해 뿌려주도록해 `it('products 들이 화면에 보인다.')` 를 통과시킬 수 있었다. 이후에

```tsx
if (products.length === 0) {
    return <div>등록된 제품이 없습니다.</div>;
  }
```

이 부분을 추가해 `it('products가 존재하지 않을 때 "등록된 제품이 없습니다" 가 나타난다.')` 을 통과시킬 수 있었다.

![Screen Shot 2022-02-22 at 8.22.03 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a748489-e3a3-45db-b1b9-68bc7fd9195b/Screen_Shot_2022-02-22_at_8.22.03_PM.jpg)

이렇게 pass가 쭉 있으면 기분이 좋다.... 매우... ㅋㅋㅋㅋㅋㅋ 이 맛에 하는건가...

## 🔹  어떻게하면 request에 관련된 method, url 을 효율적으로 관리할 수 있을지?

(1)

```tsx
export const URL = {
	GET_PRODUCTS: '/products',
	GET_PRODUCT_BY_ID: (id) => `/products/${id}`
}
```

처음에는 이런식으로만 해줬습니다.

```tsx
// client/shared/types/index.ts

export type Request = {
  [key: string]: RequestInfoWithParams;
};
```

```tsx
export const REQUEST: Request = {
  /** products **/
  GET_PRODUCTS: () => ({ method: 'get', url: '/products' }),
  GET_PRODUCT_BY_ID: (id: string) => ({ method: 'get', url: `/products/${id}` }),
  POST_PRODUCT: () => ({ method: 'post', url: '/products' }),
  DELETE_PRODUCT_BY_ID: (id: string) => ({ method: 'delete', url: `/products/${id}` }),

  /** carts **/
  GET_CARTS: () => ({ method: 'get', url: '/carts' }),
  POST_CART: () => ({ method: 'post', url: '/carts' }),
  DELETE_CART_BY_ID: (id: string) => ({ method: 'delete', url: `/carts/${id}` }),
} as const;
```

제가 개인적으로 상수화를 시키는 이유는 실수를 방지하고, 사용 할 때 편리하기 위함이었습니다. get 할거를 post 하는 등의 사고를 방지하고자 했는데, 1번처럼 URL만 따로 관리하니 요청 작업을 할 때마다 API 명세서를 보게 되더라구요. 그래서 하나의 객체에 method 와 url을 하나의 객체로 묶어뒀습니다. 개인적으로 어차피 거의 같이 사용하니까 함께 두니 더 편리했던 것 같습니다.
어떻게하면 더 효과적으로 request에 관련된 값을 정리해둘 수 있을지 궁금합니다!

## 🔹 하나의 모델과 관련된 액션들을 하나로 관리하는 것이 좋을지? 아니면 비동기 액션은 따로 관리하는 것이 좋을지?

```tsx
function* getProductsSaga(
  **action: ReturnType<typeof getProductsAsyncAction.request>,**
) {
  try {
    const products: GetProductsResponseType = yield call(productsService.getProducts);

    yield put(productsActions.getProductsAsyncAction.success(products));
  } catch (error: any) {
    yield put(productsActions.getProductsAsyncAction.failure(error));
    console.error(error);
  }
}
```

![Screen Shot 2022-02-20 at 8.23.07 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8ece7c81-ac05-4357-87b6-c11d020ba753/Screen_Shot_2022-02-20_at_8.23.07_PM.jpg)

→ 그래도 하나의 한 모델의 모든 액션을 한 곳에 두고 사용하는 것이 좋다고 판단했다.

## 🔹 리듀서에서 state와 action 구조 분해 할당이 가독성을 높힐 수 있을지?

```tsx
.addCase(
        `${getProductsAsyncAction.success}`,
        (state, action: PayloadAction<{ products: Product[] }>) => {
          state.products.isLoading = false;
          state.products.value = action.payload.products;
        },
      )
```

reducer 만들어 주실 때 state와 action을 구조분해 할당해주시는지 궁금합니다! 제가 많은 코드를 보지 않아 그럴 수 있겠지만 생각보다 많은 분들이 state와 action은 구조 분해 할당 없이 그냥 쓰시더라구요. 그런데 둘다 그렇게 쓰니까 계속 `state.products.` 이 반복되고, `action.payload.` 이 프리픽스로 붙어있으니 정말 보고 싶은 부분이 뒤에인데 계속 방해받는 느낌이 들더라구요.

```tsx
.addCase(
        `${getProductsAsyncAction.success}`,
        ({ products }, { payload }: PayloadAction<{ products: Product[] }>) => {
          products.isLoading = false;
          products.value = payload.products;
        },
      )
```

그래서 이렇게 풀어줬는데 뭐가 state 값인지 뭐가 payload 값인지 더 보기 어려워져서

```tsx
.addCase(
        `${getProductsAsyncAction.success}`,
        ( state, { payload }: PayloadAction<{ products: Product[] }>) => {
          state.products.isLoading = false;
          state.products.value = payload.products;
        },
      )
```

이렇게 state의 값이다 payload로 온 값이다 만 보여주도록 타협했습니다..! 이거에 대한 의견도 궁금합니다!

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
    const products: Product[] = yield call(productsService.getProducts);

    yield put(productsAsyncActions.getProductsAsyncAction.success(products));
  } catch (error: any) {
    yield put(productsAsyncActions.getProductsAsyncAction.failure(error));
    console.error(error);
  }
}
```

`yield put(productsAsyncActions.getProductsAsyncAction.success(products));` 와 같이 작업했다. payload에 products 단일로만 넣어줄 수 있었던 것. 만약 다른 걸 추가로 넣어주는 상황이 발생하면 대응하기 힘들 것 같다고 생각해, 2번처럼 변경하고 →

`yield put(productsAsyncActions.getProductsAsyncAction.success({ products }));`

객체로 전달해주었다.

## 🔷 test 할 때 주입 받는 값의 위치

`(1)`

```tsx
// db에서 products 값만 추줄 
import { products } from '../../../shared/fixtures/db.json';

describe('productList', () => {

  it('render products', () => {
    const result = render(<ProductList products={products} />);

    expect(result.getByText('냉면용기(대)'));
    expect(result.getByText('생새우살 (71/90) 500g 4개'));
  });
});
```

처음에는 `db.json` 에서 products 값을 가져와 테스트 해줬습니다. 그런데 이렇게 하다 보니 계속해서 `db.json`  파일을 열어보고 어떤 값들이 있는지 살펴보게 되더라구요(`getByText` 를 하려고 하는데 어떤 값을 가져와야하는지 확인). 그래서 아래의 이유들로 `(2)` 번 코드 처럼 변경했습니다.

- `db.json` 의  `products` 에 있는 모든 아이템들이 잘 렌더링 되는지 테스트 할 필요는 없음
- (아직까지는) 다른 곳에서 테스트하는데 계속 products 값을 사용하지 않아도 됨
- products 값이 아래 처럼 test 코드 근처에 있으면 테스트를 좀 더 작성하기 쉬움
- 테스트하려는 값을 test 코드 근처에서 볼 수 있어 → 어떤 테스트를 의도했는지 조금 더 이해하기 쉬움

```tsx
describe('productList', () => {
  const products = [
    {
      id: 1,
      name: '냉면용기(대)',
      price: 83700,
      imageUrl: 'https://cdn-mart./jgp',
    },
    {
      id: 2,
      name: '생새우살 (71/90) 500g 4개',
      price: 29000,
      imageUrl: 'https://cdn-mart./jgp',
    },
  ];

  it('render products', () => {
    const result = render(<ProductList products={products} />);

    expect(result.getByText('냉면용기(대)'));
    expect(result.getByText('생새우살 (71/90) 500g 4개'));
  });
});
```

그런데 이렇게 작성하다 보니까

```tsx
it('render products', () => {
    const result = render(<ProductList products={products} />);

    expect(result.getByText(products[0].name));
    expect(result.getByText(products[1].name));
  });
```

이런 식으로 작성 할 수도 있겠네요... 근데 이렇게 해도 다른 값을 테스트하려고 하면 계속해서 다른 파일을 열어봐야 할 것 같아 귀찮을 수 잇을 것 같습니다. 테스트가 문서의 역활을 할 수 있다고 해서 이런 고민을 해봤습니다. 이 내용에 대한 개인적인 생각 공유해주시면 감사하겠습니다!!

## 🔷 함수라면 함수임을 알려주는 네이밍이어야 될까?

```tsx
const returnIsBottom = (): boolean => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;

    return Math.round(scrollTop + innerHeight) >= scrollHeight;
  };

  const debouncedOnScroll = debounce(() => {
    if (returnIsBottom()) {
      workToDoWhenArrivedBottom();
    }
  }, msToDelay);
```

인피니티 스크롤 컴포넌트를 구현하며 bottom에 도달했는지 확인해야 했습니다. 그래서 bottom에 도달 여부를 `boolean` 값으로 반환하는 `isBottom` 이라는 함수를 만들었습니다. 그런데 뭔가 `boolean`인 척 하는 함수 느낌이 있어  `return` 한다는 의미를 포함시켜 함수임을 보여주고 싶었습니다.  그래서 `isBottom` 함수를  위코드 처럼 `returnIsBottom`으로 변경했습니다. 그냥 `isBottom` 으로 해도 충분할까요? 억지로 함수임을 보여줄 필요는 크게 없을까요?

그리고 불리언 값을 리턴하는 `returnIsBottom` 를  `if` 조건부에서 그냥 실행시켰습니다. 좀 더 명확하게 보여주려면 아래 방법이 더 맞는 것 같은데 괜한 임시변수를 만드는 느낌또한 있네요.

```tsx
  const debouncedOnScroll = debounce(() => {
		const isBottom = returnIsBottom(); 

    if (isBottom) {
      workToDoWhenArrivedBottom();
    }
  }, msToDelay);
```

if 조건부 안에서 함수를 동작하는 작업이 존재해도 여러모로 문제가 없을지 궁금합니다.

네이밍은 항상 어렵고, 골치아프네요...

# 🔶 TS

## 🔹 return 타입의 결과를 가지고 사용하고 싶을 때

```tsx
type FnReturnType = ReturnType<Fn>
```

## 🔹 Generic Constraints

```tsx
function logSomethingName<T>(sth: T){
	console.log(sth.name);
}
```

- 위와 같이 작성 할 경우 `tmp`의 `.length` 을 하고 싶지만
  → Property ‘name’ does not exist on type ‘Type’

```tsx
interface HasNameType {
	length: string;
}

function logSomethingName<T extend HasNameType>(sth: T){
	console.log(sth.name); // 성공
}
```

- `extends` 를 통해 `sth` 에 `name` 프로퍼티가 있다는 것을 명시할 수 있음

## 🔹 **Using Type Parameters in Generic Constraints**

```tsx
// typeof gimoonInfo[keyof typeof gimoonInfo]

const gimoonInfo = {
  name: 'gimoon',
  age: '10',
}

function getObjectValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

console.log(getObjectValue(gimoonInfo, 'name')); // gimoon

console.log(getObjectValue(gimoonInfo, 'nickname')); // undefined
// TS2345: Argument of type '"nickname"' is not assignable to parameter of type '"name" | "age"'.

```

## 🔹 Default Type in Generic

```tsx
export interface DataType {
  [key: string]: FieldValue;
}

export interface FormProps<Data extends DataType = DataType> { }
```

- If you don't provide a type `Data` (which *must* extend `DataType`), it will default to `DataType`.

```tsx
const obj: Tmp<string> = {
  addNumbers: (a, b) => {
    console.log(a, b);
  },
}

obj.addNumbers(1, 2);
```

# 🔶 문제 해결

## 🔹 test 환경에서 redux-logger 없애기

옆에 watch 모드를 살짝 보이게해서 TDD 노력하고 있는데 redux-logger가 찍혀 매번 스크롤을 내려야하더라구요. 이 부분 걸리적거리시면 test 환경 때 미들웨어 다르게 넣을 수 있으니 참고하세요!

![Screen Shot 2022-02-21 at 3.55.43 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8b3bd54-a26e-43f9-b641-7b37726398be/Screen_Shot_2022-02-21_at_3.55.43_PM.jpg)

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

## 🔹  **`useDispatch` 과 `useSelector`  의 typed versions !**

**better to create typed versions of the `useDispatch` and `useSelector` hooks for usage in your application**

공식 문서에서는 useDispatch 와 useSelector 의 **typed versions 을 만들어두고 사용하기를 권장한다 . 이유로는 아래와 같다**

- useSelector 에서, (state: RootStat) 를 매번 타이핑해줄 필요가 없음
- useDispatch 에서, 디폴트 Dispatch 타입은 비동기 타입에 대해 알지를 못함. 그래서 매번 커스텀된 AppDispatch 타입을 타이핑해줘야 함. 그런데 이렇게 **typed** version 을 만들어두면 그럴 필요가 없음

```tsx
export typeRootState=ReturnType<typeofstore.getState>;
export typeAppDispatch=typeofstore.dispatch;

export const useAppDispatch= () =>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> =useSelector;
```

## 🔹`next/link` mocking 실패하고 절망 →  next/router mocking 으로 갈아타기..

next/router를 모킹해 `<GNB />` 컴포넌트를 테스트하려고 했다. 테스트하고자 한 내용은 아래와 같다.

- [ ]  GNB 에 `WOOWA LOGO` , `주문목록` , `장바구니` 가 존재한다.
- [ ]  `WOOWA LOGO` 를 클릭하면 ‘/’(홈) 으로 이동한다.
- [ ]  `주문목록` 를 클릭하면 ‘/order’(주문목록) 으로 이동한다.
- [ ]  `장바구니` 를 클릭하면 ‘/cart’(장바구니) 으로 이동한다.

그런데 문제가 생겼다.... 처음에 `next/link` 를 통해 아래와 같은 방법으로 구현했는데

```tsx
<Link href={'/'} passHref> 
	<button>WOWWA LOGO</button>
</Link>
```

계속해서 mocking에 실패해 에러가 발생했다.. 계속 뒤져보다가 다른 방법을 제안하는 글들을 많이 봐 아래와 같이 `next/router` 로 라우팅 방식을 변경했다.

```tsx
<Logo onClick={() => router.push('/')}>WOOWA SHOP</Logo>
```

### next/router mocking

```tsx
import { NextRouter } from 'next/router';

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}
```

그리고 이 createMockRouter를 이용해 test 코드에서 모킹된 라우터를 만들어 준다.

```tsx
// client/components/GNB/GNB.txt
import { RouterContext } from 'next/dist/shared/lib/router-context';

const mockedRouter = createMockRouter({});

const renderGNB = (mockedRouter) => {
  const result = render(
    <RouterContext.Provider value={mockedRouter}>
      <GNB />;
    </RouterContext.Provider>,
  );

  const homeButton = () => result.getByRole('button', { name: 'WOOWA SHOP' });
  const cartButton = () => result.getByRole('button', { name: '장바구니' });
  const orderButton = () => result.getByRole('button', { name: '주문목록' });

  return { result, homeButton, cartButton, orderButton };
};
```

그리고 render하려는 컴포넌트(위 예시에서는 GNB)를

*`import* { RouterContext } *from* 'next/dist/shared/lib/router-context';` 를 통해 감싸줘야 한다. 그리고 모킹된 router를 value로 주입해준다. 이렇게해서 라우팅 부분을 테스트 할 수 있었다.

```tsx
describe('버튼을 클릭하면 다른 페이지로 이동한다.', () => {
  it('로고 버튼을 누르면 홈 화면으로 이동한다.', () => {
    const { homeButton } = renderGNB(mockedRouter);

    userEvent.click(homeButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.HOME());
  });

  it('장바구니 버튼을 누르면 장바구니 화면으로 이동한다.', () => {
    const { cartButton } = renderGNB(mockedRouter);

    userEvent.click(cartButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.CART());
  });

  it('주문목록 버튼을 누르면 주문목록 화면으로 이동한다', () => {
    const { orderButton } = renderGNB(mockedRouter);

    userEvent.click(orderButton());
    expect(mockedRouter.push).toHaveBeenCalledWith(URL.ORDER());
  });
});
```

# 🔶 에러 핸들링

## 🔹  확장자 오류(ts, tsx)

```
TS2749: 'ProductList' refers to a value, but is being used as a type here. Did you mean 'typeof ProductList'?
```

- jsx 문법을 쓰고 있는데 `.ts` 다 보니 이런 에러가 뜸
- `.tsx` 로 해결

## 🔹 sagaTask 타입 문제가 생길 때

```tsx
// eslint-disable-next-line import/named
import createSagaMiddleware, { Task } from 'redux-saga';

declare module 'redux' {
  export interface Store {
    sagaTask?: Task;
  }
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedRootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
```

- sagaTask 타입 문제가 생길 때
- 커스텀 타입 지정

## 🔹selector 로 부터 속성 값 추출하는 부분 유틸 함수로 분리하는데 타입 문제

```tsx
export const createModelAttributeObject = (attributeSelector: any) => ({
  value: useAppSelector(attributeSelector.value),
  isLoading: useAppSelector(attributeSelector.isLoading),
  hasError: useAppSelector(attributeSelector.hasError),
  error: useAppSelector(attributeSelector.error),
});
```

```tsx
const {
    value: products,
    isLoading: isLoadingProducts,
    hasError: hasErrorProducts,
    error: errorProducts,
  } = createModelAttributeObject(productsAttributeSelector);

// 아래와 같이 사용!! 
const { products, getProducts, isLoadingProducts } = useProducts();
```

![Screen Shot 2022-02-22 at 1.03.32 PM.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a6b17490-20f3-47a9-ad6e-609d0b42721d/Screen_Shot_2022-02-22_at_1.03.32_PM.jpg)

products의 값이 unknown....

### 해결

selector 로부터 값들을 뽑아오는 부분이 너무 반복 작업인 것 같아 utils 로 분리했다. 그런데 타입이 문제가 생겨 제네릭을 사용해 타입을 명확하게 해주고 해결했다.
