import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { CartItem } from '../../../shared/types';
import { createCartItem } from '../../../shared/utils/test-utils';
import CartListItem from '../CartListItem';

describe('<CartListItem />', () => {
  const cartItem = createCartItem();
  const carts = [createCartItem(0), createCartItem(1)];

  const useAppDispatch = jest.fn();
  const useAppSelector = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => useAppDispatch);
    useSelector.mockImplementation(() => useAppSelector);
  });

  it('장바구니에 담긴 아이템 정보를 보여준다.', () => {
    const { ProductName, ProductPrice, CartItemQuantity, IncreaseQuantityButton, DecreaseQuantityButton } =
      renderCartListItem(cartItem, carts);

    expect(ProductName()).toBeInTheDocument();
    expect(ProductPrice()).toBeInTheDocument();
    expect(CartItemQuantity()).toBeInTheDocument();
    expect(IncreaseQuantityButton()).toBeInTheDocument();
    expect(DecreaseQuantityButton()).toBeInTheDocument();
  });

  it('선택 checkbox input을 누르면 props로 전달 받은 핸들러가 호출된다.', () => {
    const { clickSelectCartItemButton, onClickCartItemSelectButton } = renderCartListItem(cartItem, carts);

    clickSelectCartItemButton();

    expect(onClickCartItemSelectButton).toHaveBeenCalled();
  });

  it('장바구니 수량 버튼(+)을 누르면 액션이 dispatch 된다.', async () => {
    const { result, clickIncreaseQuantityButton } = renderCartListItem(cartItem, carts);

    clickIncreaseQuantityButton();

    expect(useAppDispatch).toHaveBeenCalled();
  });

  it('장바구니 수량 버튼(-)을 누르면 액션이 dispatch 된다.', () => {
    const { result, clickDecreaseQuantityButton } = renderCartListItem(cartItem, carts);

    clickDecreaseQuantityButton();
    expect(useAppDispatch).toHaveBeenCalled();
  });
});

/** render utils */
const renderCartListItem = (cartItem: CartItem, selectedCartItems: CartItem[]) => {
  const onClickCartItemSelectButton = jest.fn();

  const result = render(
    <CartListItem
      cartItem={cartItem}
      onClickCartItemSelectButton={onClickCartItemSelectButton}
      selectedCartItems={selectedCartItems}
    />,
  );

  const ProductName = () => result.getByText(cartItem.product.name);
  const ProductPrice = () => result.getByText(`${cartItem.product.price}`);
  const CartItemQuantity = () => result.getByText(`${cartItem.quantity}개`);

  const selectCartItemButton = () => screen.getByRole('checkbox');
  const IncreaseQuantityButton = () => result.getByText('+');
  const DecreaseQuantityButton = () => result.getByText('-');

  const clickSelectCartItemButton = () => {
    userEvent.click(selectCartItemButton());
  };
  const clickIncreaseQuantityButton = () => {
    userEvent.click(IncreaseQuantityButton());
  };
  const clickDecreaseQuantityButton = () => {
    userEvent.click(DecreaseQuantityButton());
  };

  return {
    result,

    ProductName,
    ProductPrice,
    CartItemQuantity,
    IncreaseQuantityButton,
    DecreaseQuantityButton,

    /** UserEvent */
    clickSelectCartItemButton,
    clickIncreaseQuantityButton,
    clickDecreaseQuantityButton,

    /** mockedHandler */
    onClickCartItemSelectButton,
  };
};
