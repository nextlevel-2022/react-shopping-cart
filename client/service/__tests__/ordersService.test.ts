import { OrderDetail, OrderItem } from '../../shared/types';
import { OrderDetailFromServer, OrderItemFromServer } from '../../store/modules/orders/types';
import {
  createRefinedOrders,
  divideProductAndQuantity,
  getTotalOrderAmount,
  getTotalOrderItemNumber,
} from '../ordersService';

const ordersFromServer: OrderItemFromServer[] = [
  {
    id: 1,
    orderDetails: [
      {
        id: 1,
        name: '[리뉴얼]젓가락(종이)-정성을 담아',
        price: 21800,
        imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        quantity: 5,
      },
    ],
  },
];

const ordersForClient: OrderItem[] = [
  {
    id: 1,
    orderDetails: [
      {
        product: {
          id: 1,
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
          imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        },
        quantity: 5,
      },
    ],
  },
];

it('createRefinedOrders - 서버로부터 받아온 주문 내역을 클라이언트에서 사용하는 데이터 형태로 변환(OrderItemFromServer[]) -> OrderItem[])', () => {
  expect(createRefinedOrders(ordersFromServer)).toEqual(ordersForClient);
});

it('divideProductAndQuantity - 서버로 부터 받아온 주문 상세 내역에서 product와 quantity를 쪼개 클라이언트에서 사용하는 형태로 변환(OrderDetailFromServer[]) -> OrderDetail[])', () => {
  const orderDetailsFromServer: OrderDetailFromServer[] = [
    {
      id: 1,
      name: '[리뉴얼]젓가락(종이)-정성을 담아',
      price: 21800,
      imageUrl: 'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
      quantity: 5,
    },
  ];

  const orderDetailsForClient: OrderDetail[] = [
    {
      product: {
        id: orderDetailsFromServer[0].id,
        name: orderDetailsFromServer[0].name,
        price: orderDetailsFromServer[0].price,
        imageUrl: orderDetailsFromServer[0].imageUrl,
      },
      quantity: orderDetailsFromServer[0].quantity,
    },
  ];

  expect(divideProductAndQuantity(orderDetailsFromServer)).toEqual(orderDetailsForClient);
});

it('getTotalOrderAmount - 주문 내역의 총 액수를 계산하는 함수', () => {
  const orderDetailItem = ordersForClient[0].orderDetails[0];
  const { product, quantity } = orderDetailItem;

  expect(getTotalOrderAmount(ordersForClient)).toEqual(product.price * quantity);
});

it('getTotalOrderItemNumber - 주문 내역의 총 개수를 확인하는 함수', () => {
  expect(getTotalOrderItemNumber(ordersForClient)).toEqual(1);
});
