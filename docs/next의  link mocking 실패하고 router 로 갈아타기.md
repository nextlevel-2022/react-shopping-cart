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
