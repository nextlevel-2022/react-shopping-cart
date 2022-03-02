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
