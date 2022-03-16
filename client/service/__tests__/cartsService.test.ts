import { carts } from '../../shared/fixtures/carts';
import {
  hasSameProductInCarts,
  isMaxCartItemQuantity,
  isMinCartItemQuantity,
  transformOrderDetailFromCartItem,
} from '../cartsService';

describe('isMaxCartItemQuantity - 장바구니 아이템 수량이 유효한지 확인하는 함수(최대 수량 확인)', () => {
  it('수량이 최대라면 true를 리턴한다.', () => {
    const MAX_QUANTITY = 20;

    expect(isMaxCartItemQuantity(MAX_QUANTITY)).toEqual(true);
  });

  it('수량이 최대가 아니라면(유효한 수량이라면) false를 리턴한다.', () => {
    const validQuantities = [1, 5, 10];

    validQuantities.forEach((validQuantity) => {
      expect(isMaxCartItemQuantity(validQuantity)).toEqual(false);
    });
  });
});

describe('isMinCartItemQuantity - 장바구니 아이템 수량이 유효한지 확인하는 함수(최소 수량 확인)', () => {
  it('수량이 최소라면 true를 리턴한다.', () => {
    const MIN_QUANTITY = 1;

    expect(isMinCartItemQuantity(MIN_QUANTITY)).toEqual(true);
  });

  it('수량이 최소가 아니라면 false를 리턴한다', () => {
    const validQuantities = [3, 5, 10];

    validQuantities.forEach((validQuantity) => {
      expect(isMinCartItemQuantity(validQuantity)).toEqual(false);
    });
  });
});

describe('hasSameProductInCarts - 장바구니에 동일한 상품이 담겨있는지 확인하는 함수', () => {
  it('동일한 상품이 존재한다면 true를 리턴한다.', () => {
    const productExistInCarts = carts[0].product;

    expect(hasSameProductInCarts(carts, productExistInCarts)).toEqual(true);
  });

  it('동일한 상품이 존재하지 않는다면 false를 리턴한다.', () => {
    const productExistInCarts = carts[0].product;
    const differentProduct = { ...productExistInCarts, id: productExistInCarts.id + 1 };

    expect(hasSameProductInCarts(carts, differentProduct)).toEqual(false);
  });
});

describe('transformOrderDetailFromCartItem - 장바구니 아이템 정보를 주문 목록에서 사용하는 데이터 형태로 변환시켜준다.', () => {
  it('CartItem[]을 OrderDetail[]로 형 변환을 해준다.', () => {
    const cartsBeforeTransform = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 1,
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
          imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        },
      },
    ];

    const transformedOrderDetails = [
      {
        product: {
          id: 1,
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
          imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        },
        quantity: 1,
      },
    ];

    expect(transformOrderDetailFromCartItem(cartsBeforeTransform)).toEqual(transformedOrderDetails);
  });
});
