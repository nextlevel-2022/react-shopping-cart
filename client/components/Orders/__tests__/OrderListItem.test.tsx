import { render } from '@testing-library/react';

import { orderItem } from '../../../shared/fixtures/orderItem';
import OrderListItem, { Props } from '../OrderListItem';

describe('<OrderListItem />', () => {
  it('주문 번호와 제품 수량 정보를 확인 할 수 있다.', () => {
    const { OrderIdText, ProductQuantity } = renderOrderListItem({ orderItem });

    expect(OrderIdText()).toBeInTheDocument();
    expect(ProductQuantity()).toBeInTheDocument();
  });
});

const renderOrderListItem = ({ orderItem }: Props) => {
  const { id, orderDetails } = orderItem;

  const result = render(<OrderListItem orderItem={orderItem} />);

  const OrderIdText = () => result.getByText(`주문 번호: ${id}`);
  const ProductQuantity = () => result.getAllByText(`수량: ${orderItem.orderDetails[0].quantity}`)[0];

  return { result, OrderIdText, ProductQuantity };
};
