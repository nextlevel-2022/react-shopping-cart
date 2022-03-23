import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { CartItem } from '../../../shared/types';
import { createCartItem } from '../../../shared/utils/test-utils';
import { useAppDispatch, useAppSelector } from '../../../store';
import CartListItem from './CartListItem';

describe('<CartListItem />', () => {
  const cartItem = createCartItem();
  const carts = [createCartItem(0), createCartItem(1)];

  const VALID_CART_ITEM_QUANTITY = 10;
  const MIN_CART_ITEM_QUANTITY = 1;
  const MAX_CART_ITEM_QUANTITY = 20;

  const cartItemHasValidQuantity = createCartItem(1, VALID_CART_ITEM_QUANTITY);
  const cartItemHasMinQuantity = createCartItem(1, MIN_CART_ITEM_QUANTITY);
  const cartItemHasMaxQuantity = createCartItem(1, MAX_CART_ITEM_QUANTITY);

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
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

  it('장바구니 수량이 20개 미만 일때 버튼(+)을 누르면 액션이 dispatch 된다.', async () => {
    const { clickIncreaseQuantityButton } = renderCartListItem(cartItemHasValidQuantity, carts);

    clickIncreaseQuantityButton();

    expect(useDispatch).toHaveBeenCalledTimes(2);
  });

  it('장바구니 수량이 20개인 경우 버튼(+)을 누르면 액션이 dispatch 되지 않는다.', async () => {
    const { clickIncreaseQuantityButton } = renderCartListItem(cartItemHasMaxQuantity, carts);

    console.log(cartItemHasMaxQuantity);

    clickIncreaseQuantityButton();

    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it('장바구니 수량이 1개를 초과하는 경우 버튼(-)을 누르면 액션이 dispatch 된다.', () => {
    const { clickDecreaseQuantityButton } = renderCartListItem(cartItemHasValidQuantity, carts);

    clickDecreaseQuantityButton();

    expect(useDispatch).toHaveBeenCalledTimes(2);
  });

  it('장바구니 수량이 1개인 경우 버튼(-)을 누르면 액션이 dispatch 되지 않는다.', async () => {
    const { clickDecreaseQuantityButton } = renderCartListItem(cartItemHasMinQuantity, carts);

    clickDecreaseQuantityButton();

    expect(useDispatch).toHaveBeenCalledTimes(1);
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
  const ProductPrice = () => result.getByText(`${cartItem.product.price}원`);
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
