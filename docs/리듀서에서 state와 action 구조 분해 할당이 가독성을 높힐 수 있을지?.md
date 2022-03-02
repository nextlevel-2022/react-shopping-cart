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
