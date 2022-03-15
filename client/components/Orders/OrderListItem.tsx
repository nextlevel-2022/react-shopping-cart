import styled from 'styled-components';

import { COLOR } from '../../shared/constants/css';
import { OrderItem } from '../../shared/types';
import ProductItem from '../ProductList/ProductItem';

export interface Props {
  orderItem: OrderItem;
}

const OrderListItem = ({ orderItem: { id, orderDetails } }: Props) => {
  return (
    <Container>
      <OrderIdContainer>
        <h1>주문 번호: {id}</h1>
      </OrderIdContainer>
      {orderDetails.map(({ product, quantity }) => {
        return (
          <ProductItemContainer>
            <ProductItem product={product} onClickAddCartButton={() => alert('hello')} />
            <span>수량: {quantity}</span>
          </ProductItemContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  background-color: ${COLOR.WHITE};
  width: 60%;
  border: 1px solid ${COLOR.GRAY_150};
`;

const OrderIdContainer = styled.div`
  height: 5.5rem;
  border: 1px solid ${COLOR.GRAY_150};
  background-color: ${COLOR.GRAY_50};
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const ProductItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${COLOR.GRAY_150};
`;

export default OrderListItem;

// feat: OrderListItem(주문 항목 정보를 보여주는 컴포넌트) 추가
//   -
