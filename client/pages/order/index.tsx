import styled from 'styled-components';

import OrderListContainer from '../../components/Orders/OrderListContainer';
import { COLOR } from '../../shared/constants/css';

const Order = () => {
  return (
    <Container>
      <Header>주문 목록</Header>
      <OrderListContainer />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${COLOR.GRAY_50};
`;

const Header = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  padding: 2rem;
`;

export default Order;
