import { MouseEvent } from 'react';
import styled from 'styled-components';

import useCarts from '../../../hooks/service/useCarts';
import { BUTTON_SIZE } from '../../../shared/constants/css';
import { CartItem } from '../../../shared/types';
import Button from '../../@atom/Button/Button';

export interface Props {
  /** 장바구니에 담긴 상품 */
  cartItem: CartItem;
  /** 유저가 장바구니 내 상품을 클릭했을 때 핸들러 */
  onClickCartItemSelectButton: ({ target }: MouseEvent<HTMLInputElement>, cartItemBeMutated: CartItem) => void;
  /** 유저가 장바구니에서 선택한 상품들의 배열 */
  selectedCartItems: CartItem[];
}

const CartListItem = ({ cartItem, onClickCartItemSelectButton, selectedCartItems }: Props) => {
  const { id: cartItemId, product, quantity } = cartItem;
  const { name, imageUrl, price } = product;
  const { increaseCartItemQuantityById, decreaseCartItemQuantityById } = useCarts();

  const isSelectedCartItem = (): boolean => {
    return selectedCartItems.includes(cartItem);
  };

  return (
    <Container>
      <label htmlFor="SelectCartItemButton" />
      <input
        id={'SelectCartItemButton'}
        type={'checkbox'}
        onClick={(event: MouseEvent<HTMLInputElement>) => onClickCartItemSelectButton(event, cartItem)}
        checked={isSelectedCartItem()}
      />
      <Image src={imageUrl} alt="product image" />
      <ProductTitle>{name}</ProductTitle>
      <RightAsideContainer>
        <div>{price}원</div>
        <div>{quantity}개</div>
        <TMP>
          <Button onClick={() => increaseCartItemQuantityById(cartItemId, quantity)} size={BUTTON_SIZE.SMALL}>
            +
          </Button>
          <Button onClick={() => decreaseCartItemQuantityById(cartItemId, quantity)} size={BUTTON_SIZE.SMALL}>
            -
          </Button>
        </TMP>
      </RightAsideContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid;
`;

const TMP = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const Image = styled.img`
  width: 9rem;
  height: 9rem;
`;

const ProductTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 0;
`;

const RightAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
`;

export default CartListItem;
