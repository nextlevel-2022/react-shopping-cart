import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';

import { product } from '../../../shared/fixtures/product';
import { Product } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store';
import OrderedProduct from './OrderedProduct';

describe('<OrderedProduct />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('주문된 상품 정보를 보여준다.', () => {
    const { ProductName, ProductPrice, ProductQuantity, AddCartButton } = renderOrderedProduct({
      product,
      quantity: 1,
    });

    expect(ProductName()).toBeInTheDocument();
    expect(ProductPrice()).toBeInTheDocument();
    expect(ProductQuantity()).toBeInTheDocument();
    expect(AddCartButton()).toBeInTheDocument();
  });
});

interface Props {
  product: Product;
  quantity: number;
}

const renderOrderedProduct = ({ product, quantity }: Props) => {
  const result = render(<OrderedProduct product={product} quantity={quantity} />);

  const ProductName = () => result.getByText(`${product.name}`);
  const ProductPrice = () => result.getByText(`${product.price} 원`);
  const ProductQuantity = () => result.getByText(`수량: ${1}`);
  const AddCartButton = () => result.getByText('담기');

  const clickAddCartButton = () => {
    userEvent.click(AddCartButton());
  };

  return {
    ProductName,
    ProductPrice,
    ProductQuantity,
    AddCartButton,
    clickAddCartButton,
  };
};
