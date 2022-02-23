import React from 'react';
import OrderList from '@/components/order/List';
import Header from '@/components/common/Header';

const OrderListPage = () => {
  return (
    <div className="page">
      <Header title="주문 목록" />
      <OrderList />
    </div>
  );
};

export default OrderListPage;
