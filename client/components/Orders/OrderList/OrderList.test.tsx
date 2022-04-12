import { render } from '@testing-library/react';

import { useDispatch, useSelector } from '../../../__mocks__/react-redux';
import { getTotalOrderAmount, getTotalOrderItemNumber } from '../../../service/ordersService';
import { orders } from '../../../shared/fixtures/orders';
import { useAppDispatch, useAppSelector } from '../../../store';
import OrderList, { Props } from './OrderList';

describe('<OrderList />', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockImplementation(() => useAppDispatch);
    (useSelector as jest.Mock).mockImplementation(() => useAppSelector);
  });

  it('로딩중인 경우 로딩임을 보여준다.', () => {
    const { LoadingText } = renderOrderList({
      orders,
      isLoading: true,
    });

    expect(LoadingText()).toBeInTheDocument();
  });

  it('로딩중이 아닌 경우 총 주문 상품 개수와 액수를 보여준다.', () => {
    const { TotalOrderItemNumberText, TotalOrderAmountText } = renderOrderList({
      orders,
      isLoading: false,
    });

    expect(TotalOrderItemNumberText()).toBeInTheDocument();
    expect(TotalOrderAmountText()).toBeInTheDocument();
  });

  it('주문내역(orders)에 아무것도 들어있지 않다면 주문 내역이 존재하지 않다는 메시지를 보여준다.', () => {
    const { NoneOrderItemText } = renderOrderList({ orders: [], isLoading: false });

    expect(NoneOrderItemText()).toBeInTheDocument();
  });
});

/** render utils */
const renderOrderList = ({ orders, isLoading }: Props) => {
  const result = render(<OrderList orders={orders} isLoading={isLoading} />);

  const LoadingText = () => result.getByText('로딩중');
  const TotalOrderItemNumberText = () => result.getByText(`총 주문 상품 개수: ${getTotalOrderItemNumber(orders)}`);
  const TotalOrderAmountText = () => result.getByText(`총 주문 액수: ${getTotalOrderAmount(orders)}`);

  const NoneOrderItemText = () => result.getByText('주문 내역이 존재하지 않습니다.');

  return { result, LoadingText, TotalOrderItemNumberText, TotalOrderAmountText, NoneOrderItemText };
};
