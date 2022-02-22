import { expect } from '@jest/globals';
import { render } from '@testing-library/react';

import ProductList from '../ProductList';

describe('<ProductList/> 제품들이 보이는 컴포넌트가 렌더링 된다', () => {
  describe('products 가 존재 할 때(배열 안에 product 들이 있을 때)', () => {
    const products = [
      {
        id: 1,
        name: '냉면용기(대)',
        price: 83700,
        imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
      },
      {
        id: 2,
        name: '생새우살 (71/90) 500g 4개',
        price: 29000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
      },
    ];

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
