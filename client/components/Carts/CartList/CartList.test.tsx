import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { CartItem } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store';
import CartList from './CartList';

const cartItem: CartItem = {
  id: 1,
  product: {
    id: 1,
    name: '[리뉴얼]젓가락(종이)-정성을 담아',
    price: 21800,
    imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
  },
  quantity: 20,
};

const carts = [cartItem];

describe('render', () => {
  it('로딩중인 상태에는 로딩중 상태를 보인다.', () => {
    const { loadingText } = renderCartList({
      carts,
      isLoading: true,
    });

    expect(loadingText()).toBeInTheDocument();
  });

  it('로딩중이 아닌 경우 장바구니 정보가 나타난다.', () => {
    const {
      productName,
      productPrice,
      productQuantity,
      deleteCartItemButton,
      selectAllCartItemButton,
      orderButtonWithQuantity,
    } = renderCartList({
      carts,
      isLoading: false,
    });

    expect(productName()).toBeInTheDocument();
    expect(productPrice()).toBeInTheDocument();
    expect(productQuantity()).toBeInTheDocument();
    expect(deleteCartItemButton()).toBeInTheDocument();
    expect(selectAllCartItemButton()).toBeInTheDocument();
    expect(orderButtonWithQuantity()).toBeInTheDocument();
  });
});

describe('', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => useAppDispatch);
    useSelector.mockImplementation(() => useAppSelector);
    global.confirm = jest.fn(() => true);
  });

  it('', () => {
    const {
      productName,
      productPrice,
      productQuantity,
      selectCartItemButton,
      deleteCartItemButton,
      selectAllCartItemButton,
      orderButtonWithQuantity,
    } = renderCartList({
      carts,
      isLoading: false,
    });
  });
});

/** render util */
const renderCartList = ({ carts, isLoading }: { carts: CartItem[]; isLoading: boolean }) => {
  const { getByText, getByLabelText } = render(<CartList carts={carts} isLoading={isLoading} />);

  const onClickDeleteCartItemButton = jest.fn();
  const onClickOrderButtonWithQuantity = jest.fn();
  const onClickSelectAllCartItemButton = jest.fn();
  const onClickSelectCartItemButton = jest.fn();

  const ProductName = () => getByText('[리뉴얼]젓가락(종이)-정성을 담아');
  const ProductPrice = () => getByText('21800원');
  const ProductQuantity = () => getByText('20개');
  const LoadingText = () => getByText('로딩중');

  const DeleteCartItemButton = () => getByText('선택된 상품 삭제');
  const OrderButtonWithQuantity = () => screen.getByText('주문하기(0)');

  const SelectAllCartItemButton = () => getByLabelText('전체선택');
  const SelectCartItemButton = () => getByLabelText('선택');

  const clickDeleteCartItemButton = () => {
    userEvent.click(DeleteCartItemButton());
  };

  const clickOrderButtonWithQuantity = () => {
    userEvent.click(OrderButtonWithQuantity());
  };

  const clickSelectAllCartItemButton = async () => {
    await act(async () => {
      userEvent.click(SelectAllCartItemButton());
    });
  };
  const clickSelectCartItemButton = () => async () => {
    await act(async () => {
      userEvent.click(SelectCartItemButton());
    });
  };

  return {
    productName: ProductName,
    productPrice: ProductPrice,
    productQuantity: ProductQuantity,
    selectCartItemButton: SelectCartItemButton,
    loadingText: LoadingText,
    deleteCartItemButton: DeleteCartItemButton,
    selectAllCartItemButton: SelectAllCartItemButton,
    orderButtonWithQuantity: OrderButtonWithQuantity,

    /** UserEvent */
    clickDeleteCartItemButton,
    clickOrderButtonWithQuantity,
    clickSelectAllCartItemButton,
    clickSelectCartItemButton,
  };
};
