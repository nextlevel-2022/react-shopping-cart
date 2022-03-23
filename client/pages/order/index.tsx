import styled from 'styled-components';

import OrderListContainer from '../../components/Orders/OrderListContainer';

const Order = () => {
  return (
    <Container>
      <Header>주문 목록</Header>
      <OrderListContainer />
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem;
`;

export default Order;
