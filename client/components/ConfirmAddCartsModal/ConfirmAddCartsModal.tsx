import styled from 'styled-components';

import useCarts from '../../hooks/service/useCarts';
import { Product } from '../../shared/types';
import Button from '../@atom/Button/Button';

export interface Props {
  /** 장바구니에 추가될 상품 */
  productToBeAdded: Product;
  /** 모달을 닫는 함수 */
  closeModal: () => void;
}

const ConfirmAddCartsModal = ({ productToBeAdded, closeModal }: Props) => {
  const { addCarts } = useCarts();

  const AddCartItemAndCloseModal = () => {
    addCarts(productToBeAdded);
    closeModal();
  };

  return (
    <Container>
      <Message>장바구니에 추가하시겠습니까?</Message>
      <Button onClick={AddCartItemAndCloseModal}>담기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Message = styled.span`
  font-size: 1.5rem;
`;

export default ConfirmAddCartsModal;
