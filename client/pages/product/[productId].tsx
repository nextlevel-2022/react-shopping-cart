import { useState } from 'react';
import styled from 'styled-components';

import BottomUpModal from '../../components/@atom/BottomUpModal/BottomUpModal';
import Button from '../../components/@atom/Button/Button';
import ConfirmAddCartsModal from '../../components/ConfirmAddCartsModal/ConfirmAddCartsModal';
import productsRequest from '../../service/apis/products';
import { Product } from '../../shared/types';

export interface ServerSideProps {
  /**보여줄 상품의 정보*/
  product: Product;
}

const ProductDetailPage = ({ product }: ServerSideProps) => {
  const { price, name, imageUrl } = product;
  const [isOpenAddCartsModal, setIsOpenAddCartModal] = useState<boolean>(false);

  return (
    <Container>
      <ProductImage src={imageUrl} alt={'product image'} />
      <ProductName>{name}</ProductName>
      <div>금액: {price}원</div>
      <ButtonContainer>
        <Button onClick={() => setIsOpenAddCartModal(true)}>장바구니 담기</Button>
      </ButtonContainer>
      <BottomUpModal onClose={() => setIsOpenAddCartModal(false)} isOpen={isOpenAddCartsModal}>
        <ConfirmAddCartsModal productToBeAdded={product} closeModal={() => setIsOpenAddCartModal(false)} />
      </BottomUpModal>
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.params.productId;
  const product = await productsRequest.getProductById(id);

  return {
    props: {
      product,
    },
  };
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;
const ProductImage = styled.img`
  width: 20rem;
`;

const ProductName = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

export default ProductDetailPage;
