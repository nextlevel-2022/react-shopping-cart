import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';

import { cartItem } from '../../shared/fixtures/cartItem';
import { carts } from '../../shared/fixtures/carts';
import { product } from '../../shared/fixtures/product';
import { useAppDispatch } from '../../store';
import ConfirmAddCartsModal from './ConfirmAddCartsModal';

describe('<ConfirmAddCartModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => carts);
  });

  it('처음에 추가할 것인지 묻는 메시지와 담기 버튼이 렌더링 된다.', () => {
    const { AddCartButton, AddCartMessage } = renderConfirmAddCartsModal();

    expect(AddCartMessage()).toBeInTheDocument();
    expect(AddCartButton()).toBeInTheDocument();
  });

  it('담기 버튼을 클릭하면 dispatch와 props로 받아온 closeModal 함수가 호출된다.', () => {
    const { closeModal, clickAddCartButton } = renderConfirmAddCartsModal();

    clickAddCartButton();

    expect(closeModal).toBeCalled();
    expect(useDispatch).toBeCalled();
  });
});

const renderConfirmAddCartsModal = () => {
  const closeModal = jest.fn();
  const result = render(<ConfirmAddCartsModal productToBeAdded={product} closeModal={closeModal} />);
  const carts = jest.fn(() => [cartItem]);

  const AddCartMessage = () => result.getByText('장바구니에 추가하시겠습니까?');
  const AddCartButton = () => result.getByText('담기');

  const clickAddCartButton = () => {
    userEvent.click(AddCartButton());
  };

  return { closeModal, result, carts, AddCartButton, AddCartMessage, clickAddCartButton };
};
