import React from 'react';
import Header from '@/components/common/Header';
import Order from '@/components/order/index';

const OrderPage = () => {
  return (
    <div className="page">
      <Header title="주문/결제" />
      <Order />
    </div>
  );
};

export default OrderPage;
