import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import { URL } from '../../../shared/constants/url';
import { OrderDetail, Product } from '../../../shared/types';
import BottomUpModal from '../../@atom/BottomUpModal/BottomUpModal';
import Button from '../../@atom/Button/Button';
import ConfirmAddCartsModal from '../../ConfirmAddCartsModal/ConfirmAddCartsModal';

export interface Props {
  /** 상품을 나타냅니다 */
  product: Product;
  /** 주문된 수량 */
  quantity: OrderDetail['quantity'];
}

const OrderedProduct = ({ product, quantity }: Props) => {
  const { id, name, price, imageUrl } = product;
  const [isOpenAddCartsModal, setIsOpenAddCartModal] = useState<boolean>(false);

  return (
    <Container>
      <BottomUpModal onClose={() => setIsOpenAddCartModal(false)} isOpen={isOpenAddCartsModal}>
        <ConfirmAddCartsModal productToBeAdded={product} closeModal={() => setIsOpenAddCartModal(false)} />
      </BottomUpModal>
      <Link href={URL.PRODUCT_DETAIL(id)} passHref>
        <Image src={imageUrl} alt={name} />
      </Link>
      <InformationContainer>
        <Name>{name}</Name>
        <Price>{price} 원</Price>
        <div>수량: {quantity}</div>
        <Button onClick={() => setIsOpenAddCartModal(true)}>담기</Button>
      </InformationContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Image = styled.img`
  width: 17.625rem;
  height: 17.625rem;
  cursor: pointer;
`;

const InformationContainer = styled.div`
  margin: 0.5rem 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.span`
  font-size: 1rem;
`;
const Price = styled.span`
  font-size: 1.25rem;
`;

export default OrderedProduct;
