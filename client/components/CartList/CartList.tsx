import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

import useCarts from '../../hooks/service/useCarts';
import useOrders from '../../hooks/service/useOrders';
import ordersRequest from '../../service/apis/orders';
import { URL } from '../../shared/constants/url';
import { CartItem } from '../../shared/types';
import Spinner from '../Spinner/Spinner';
import CartListItem from './CartListItem';

interface Props {
  carts: CartItem[];
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
    const isCartItemSelected = selectedCartItems.length > 0;

    if (!isCartItemSelected) return alert('선택된 아이템이 없습니다.');

    const isPaymentConfirmTrue = confirm('결제 하시겠습니까?');

    if (!isPaymentConfirmTrue) return;

    console.log('--', selectedCartItems);

    deleteSelectedCartItem();

    router.push(URL.ORDER());
  };

  if (isLoading) return <Spinner>로딩중</Spinner>;

  return (
    <div>
      <h1>장바구니</h1>
      <label htmlFor="selectAllButton">전체선택</label>
      <input id="selectAllButton" type={'checkbox'} onClick={(event) => onClickSelectAllButton(event)} />
      <button onClick={deleteSelectedCartItem}>상품삭제</button>
      <div>
        <div>든든 배송 상품 ({carts.length}개)</div>
        <div>결제 예상 금액:{calculateExpectedPrice(selectedCartItems)}</div>
        <button onClick={orderSelectedCartItem}>주문하기({selectedCartItems.length})</button>
      </div>
      <div>
        {carts.map((cartItem, index) => (
          <CartListItem
            key={`cart-item-${index}`}
            cartItem={cartItem}
            onClickCartItemSelectButton={mutateSelectedCartItems}
            selectedCartItems={selectedCartItems}
          />
        ))}
      </div>
    </div>
  );
};

const calculateExpectedPrice = (selectedCartItems: CartItem[]) => {
  const PRICE_WHEN_SELECTED_NOTHING = 0;

  return selectedCartItems.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    PRICE_WHEN_SELECTED_NOTHING,
  );
};

export default CartList;
