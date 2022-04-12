import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';

import useCarts from '../../../hooks/service/useCarts';
import ordersRequest from '../../../service/apis/orders';
import { calculateExpectedPrice } from '../../../service/cartsService';
import { BUTTON_SIZE, COLOR } from '../../../shared/constants/css';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from '../../../shared/constants/message';
import { URL } from '../../../shared/constants/url';
import { CartItem } from '../../../shared/types';
import Button from '../../@atom/Button/Button';
import Spinner from '../../@atom/Spinner/Spinner';
import CartListItem from '../CartListItem/CartListItem';

export interface Props {
  /** 장바구니에 담긴 상품들의 배열 */
  carts: CartItem[];
  /** 로딩중인지 아닌지를 알려주는 값 */
  isLoading: boolean;
}

const CartList = ({ carts, isLoading }: Props) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const { deleteCartItemById } = useCarts();

  const router = useRouter();

  const addSelectedItemToCarts = (cartItemToBeAdded: CartItem) => {
    setSelectedCartItems((prevSelectedCartItems) => [...prevSelectedCartItems, cartItemToBeAdded]);
  };

  const removeSelectedItemFromCarts = (cartItemToBeRemoved: CartItem) => {
    setSelectedCartItems((prevSelectedCartItems) =>
      prevSelectedCartItems.filter((cartItem) => cartItem !== cartItemToBeRemoved),
    );
  };

  const mutateSelectedCartItems = ({ target }: MouseEvent<HTMLInputElement>, cartItemBeMutated: CartItem) => {
    const isSelected = (target as HTMLInputElement).checked;

    switch (true) {
      case isSelected:
        addSelectedItemToCarts(cartItemBeMutated);
        break;

      case !isSelected:
        removeSelectedItemFromCarts(cartItemBeMutated);
        break;
    }
  };

  const deleteSelectedCartItem = () => {
    selectedCartItems.forEach(({ id }) => deleteCartItemById(id));
  };

  const clearSelectedCartItems = () => {
    setSelectedCartItems([]);
  };

  const selectAllCartItems = () => {
    setSelectedCartItems([...carts]);
  };

  const onClickSelectAllButton = (event: MouseEvent) => {
    const isActivatedSelectAll = (event.target as HTMLInputElement).checked;

    if (isActivatedSelectAll) selectAllCartItems();
    else clearSelectedCartItems();
  };

  const orderSelectedCartItem = () => {
    if (selectedCartItems.length === 0) return alert(ALERT_MESSAGE.EMPTY_SELECTED_CART_ITEM);
    if (!confirm(CONFIRM_MESSAGE.CONFIRM_PAY_IN_CARTS)) return;

    deleteSelectedCartItem();
    ordersRequest.addOrderItem(selectedCartItems);

    router.push(URL.ORDER());
  };

  const renderCartItems = () => {
    if (carts.length === 0) return <div>장바구니가 비어있습니다.</div>;

    return carts.map((cartItem, index) => (
      <CartListItem
        key={`cart-item-${index}`}
        cartItem={cartItem}
        onClickCartItemSelectButton={mutateSelectedCartItems}
        selectedCartItems={selectedCartItems}
      />
    ));
  };

  if (isLoading) return <Spinner>로딩중</Spinner>;

  return (
    <Container>
      <Header>장바구니</Header>
      <SelectedInformation>
        <div>
          <input id="selectAllButton" type={'checkbox'} onClick={(event) => onClickSelectAllButton(event)} />
          <label htmlFor="selectAllButton">전체선택</label>
        </div>
        <DeleteCartItemContainer>
          <Button
            onClick={deleteSelectedCartItem}
            size={BUTTON_SIZE.SMALL}
            backgroundColor={COLOR.GRAY_300}
            textColor={COLOR.WHITE}
          >
            선택된 상품 삭제
          </Button>
        </DeleteCartItemContainer>
      </SelectedInformation>
      <CartsTotalNumber>든든 배송 상품 ({carts.length}개)</CartsTotalNumber>
      <CartsInformationContainer>
        <CartsLeftSection>{renderCartItems()}</CartsLeftSection>
        <CartsRightSection>
          <TotalAmount>결제 예상 금액</TotalAmount>
          <TotalAmount>{calculateExpectedPrice(selectedCartItems)} 원</TotalAmount>
          <Button
            onClick={orderSelectedCartItem}
            size={BUTTON_SIZE.LARGE}
          >{`주문하기(${selectedCartItems.length})`}</Button>
        </CartsRightSection>
      </CartsInformationContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 4rem;
`;

const DeleteCartItemContainer = styled.div`
  width: 15%;
`;

const SelectedInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
`;

const CartsInformationContainer = styled.div`
  display: flex;
`;

const CartsLeftSection = styled.div`
  width: 60%;
  margin-top: 50px;
`;

const CartsRightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 1rem;
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;

  border: 1px solid #dddddd;
`;

const TotalAmount = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const CartsTotalNumber = styled.h2`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid;
`;

export default CartList;
