import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from '../../service/cartsService';

export const ALERT_MESSAGE = {
  MAX_CART_ITEM_QUANTITY: `장바구니 상품의 최대 수량은 ${MAX_CART_ITEM_QUANTITY} 입니다.`,
  MIN_CART_ITEM_QUANTITY: `장바구니 상품의 최소 수량은 ${MIN_CART_ITEM_QUANTITY} 입니다.`,
  ADD_CART_SUCCESS: '장바구니에 상품 추가를 완료헀습니다.',
  ALREADY_EXIST_CART_ITEM: '이미 장바구니에 같은 상품이 존재합니다.',
  EMPTY_SELECTED_CART_ITEM: '장바구니에 선택된 상품이 존재하지 않습니다.',
};

export const CONFIRM_MESSAGE = {
  CONFIRM_PAY_IN_CARTS: '선택된 장바구니 상품을 결제하시겠습니다.',
};
