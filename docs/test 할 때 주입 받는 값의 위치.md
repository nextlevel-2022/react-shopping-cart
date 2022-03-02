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
