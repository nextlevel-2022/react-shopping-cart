## 🔹  TDD

이번에는 꼭 TDD를 해보자 생각해서 ProductsList 관련 부분만 맛보기로 진행해봤다. 우선 watch 모드로 성공 실패만 보이게 살짝해두며 작업을 했다.

- [ ]  `<ProductListContainer />` 가 렌더된다.
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

<img src="https://user-images.githubusercontent.com/44131043/155137284-8ca0637b-16b5-4288-81cb-bbf3fb0622e5.jpg" width=300px>

이렇게 pass가 쭉 있으면 매우 기분이 좋다.... 매우... ㅋㅋㅋㅋㅋㅋ 이 맛에 하는건가... 재미있다

