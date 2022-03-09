import Link from 'next/link';
import styled from 'styled-components';

import useCarts from '../../hooks/service/useCarts';
import { URL } from '../../shared/constants/url';
import { Product } from '../../shared/types';

export interface Props {
  /** 상품을 나타냅니다 */
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const { id, name, price, imageUrl } = product;
  const { addCarts } = useCarts();

  const addCartItem = () => {
    addCarts(product);
  };

  return (
    <Container>
      <Link href={URL.PRODUCT_DETAIL(id)} passHref>
        <Image src={imageUrl} alt={name} />
      </Link>
      <InformationContainer>
        <Name>{name}</Name>
        <Price>{price} 원</Price>
      </InformationContainer>
    </Container>
  );
};

const Container = styled.div``;
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
const Price = styled.span``;

export default ProductItem;
