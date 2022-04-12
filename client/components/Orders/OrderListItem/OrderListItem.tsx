import styled from 'styled-components';

import { COLOR } from '../../../shared/constants/css';
import { OrderItem } from '../../../shared/types';
import OrderedProduct from '../OrderedProduct/OrderedProduct';

export interface Props {
  orderItem: OrderItem;
}

const OrderListItem = ({ orderItem: { id, orderDetails } }: Props) => {
  return (
    <Container>
      <OrderIdContainer>
        <h1>주문 번호: {id}</h1>
      </OrderIdContainer>
      <ProductItemContainer>
        {orderDetails.map(({ product, quantity }) => (
          <OrderedProduct key={`order-item-${id}-${product.id}`} product={product} quantity={quantity} />
        ))}
      </ProductItemContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  background-color: ${COLOR.WHITE};
  width: 50%;
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
