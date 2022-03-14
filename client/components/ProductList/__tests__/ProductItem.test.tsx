import { render } from '@testing-library/react';

import { Product } from '../../../shared/types';
import ProductItem from '../ProductItem';

const product = {
  id: 1,
  name: '냉면용기(대)',
  price: 83700,
  imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
};

describe('<ProductItem />', () => {
  it('상품의 title, price, image 정보를 보여준다.', () => {
    const { ProductImage, ProductItemPrice, ProductItemTitle } = renderProductItem(product);

    expect(ProductItemPrice()).toBeInTheDocument();
    expect(ProductItemTitle()).toBeInTheDocument();
    expect(ProductImage()).toBeInTheDocument();
  });
});

const renderProductItem = (product: Product) => {
  const result = render(<ProductItem product={product} />);

  const ProductItemTitle = () => result.getByText('냉면용기(대)');
  const ProductItemPrice = () => result.getByText('83700 원');
  const ProductImage = () => result.getByRole('img');

  return { result, ProductItemPrice, ProductItemTitle, ProductImage };
};
