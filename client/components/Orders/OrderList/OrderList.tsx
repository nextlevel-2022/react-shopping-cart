import styled from 'styled-components';

import { getTotalOrderAmount, getTotalOrderItemNumber } from '../../../service/ordersService';
import { OrderItem } from '../../../shared/types';
import Spinner from '../../@atom/Spinner/Spinner';
import OrderListItem from '../OrderListItem/OrderListItem';

export interface Props {
  orders: OrderItem[];
  isLoading: boolean;
}

const OrderList = ({ orders, isLoading }: Props) => {
  if (isLoading)
    return (
      <>
        <Spinner />
        로딩중
      </>
    );

  const renderOrderListItem = () => {
    if (orders.length === 0) return <NoneOrdersMessage>주문 내역이 존재하지 않습니다.</NoneOrdersMessage>;

    return orders.map((orderItem) => <OrderListItem key={`order-item-${orderItem.id}`} orderItem={orderItem} />);
  };

  return (
    <Container>
      <div>총 주문 상품 개수: {getTotalOrderItemNumber(orders)}</div>
      <div>총 주문 액수: {getTotalOrderAmount(orders)}</div>
      {renderOrderListItem()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoneOrdersMessage = styled.h1`
  margin-top: 3rem;
`;

export default OrderList;
