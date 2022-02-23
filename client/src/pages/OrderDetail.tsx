import React from 'react';
import Header from '@/components/common/Header';
import OrderDetail from '@/components/order/Detail';

const OrderDetailPage = () => {
  return (
    <div className="page">
      <Header title="주문내역상세" />
      <OrderDetail />
    </div>
  );
};

export default OrderDetailPage;
