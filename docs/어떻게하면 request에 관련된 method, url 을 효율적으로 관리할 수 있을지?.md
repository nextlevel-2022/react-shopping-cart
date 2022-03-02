## 어떻게하면 request에 관련된 method, url 을 효율적으로 관리할 수 있을지?

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
