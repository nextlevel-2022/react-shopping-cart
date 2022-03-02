import { render } from '@testing-library/react';

import { Product } from '../../../shared/types';
import ProductList from '../ProductList';

const emptyProducts = [];
const notEmptyProducts = [
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

interface RenderProductListParams {
  products: Product[];
  isLoadingProducts: boolean;
}

const renderProductList = ({ products, isLoadingProducts }: RenderProductListParams) => {
  const result = render(<ProductList products={products} isLoadingProducts={isLoadingProducts} />);

  const loadingText = () => result.getByText('로딩중');

  const productItem1 = () => result.getByText('냉면용기(대)');
  const productItem2 = () => result.getByText('생새우살 (71/90) 500g 4개');

  const productsIsEmptyText = () => result.getByText('등록된 제품이 없습니다.');

  return {
    result,
    loadingText,
    productItem1,
    productItem2,
    productsIsEmptyText,
  };
};

describe('<ProductList/> 제품들이 보이는 컴포넌트가 렌더링 된다', () => {
  describe('로딩중일때', () => {
    it('products 배열이 빈 배열인 경우에도 isLoadingProducts true이면 로딩중임을 보인다.', () => {
      const { loadingText } = renderProductList({
        products: emptyProducts,
        isLoadingProducts: true,
      });

      expect(loadingText()).toBeInTheDocument();
    });

    it('products 빈 배열이 아닌 경우에도 isLoadingProducts true이면 로딩중임을 보인다.', () => {
      const { loadingText } = renderProductList({
        products: notEmptyProducts,
        isLoadingProducts: true,
      });

      expect(loadingText()).toBeInTheDocument();
    });
  });

  describe('products 가 존재 할 때(배열 안에 product 들이 있을 때)', () => {
    it('products 들이 화면에 보인다.', () => {
      const { productItem1, productItem2 } = renderProductList({
        products: notEmptyProducts,
        isLoadingProducts: false,
      });

      expect(productItem1()).toBeInTheDocument();
      expect(productItem2()).toBeInTheDocument();
    });
  });

  describe('products가 존재하지 않을 때 ', () => {
    it('products가 존재하지 않을 때 "등록된 제품이 없습니다" 가 나타난다.', () => {
      const { productsIsEmptyText } = renderProductList({
        products: emptyProducts,
        isLoadingProducts: false,
      });

      expect(productsIsEmptyText()).toBeInTheDocument();
    });
  });
});
