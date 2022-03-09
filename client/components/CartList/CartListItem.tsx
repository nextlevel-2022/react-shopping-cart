import { MouseEvent } from 'react';
import styled from 'styled-components';

import useCarts from '../../hooks/service/useCarts';
import { CartItem } from '../../shared/types';

interface Props {
  cartItem: CartItem;
  onClickCartItemSelectButton: ({ target }: MouseEvent<HTMLInputElement>, cartItemBeMutated: CartItem) => void;
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
      <label htmlFor="SelectCartItemButton">선택</label>
      <input
        id={'SelectCartItemButton'}
        type={'checkbox'}
        onClick={(event: MouseEvent<HTMLInputElement>) => onClickCartItemSelectButton(event, cartItem)}
        checked={isSelectedCartItem()}
      />
      <Image src={imageUrl} alt="" />
      <div>{name}</div>
      <RightAsideContainer>
        <div>{cartItemId}</div>
        <div>{price}</div>
        <div>{quantity}개</div>
        <div>
          <button onClick={() => increaseCartItemQuantityById(cartItemId, quantity)}>+</button>
          <button onClick={() => decreaseCartItemQuantityById(cartItemId, quantity)}>-</button>
        </div>
      </RightAsideContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  display: flex;
`;

const Image = styled.img`
  width: 9rem;
  height: 9rem;
`;

const RightAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default CartListItem;
