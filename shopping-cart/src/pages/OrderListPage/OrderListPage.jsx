import React from 'react';
import API from '../../API';

const OrderListPage = () => {
  API.getProduct("/orders")
    .then(res => res.data)
    .then(data => console.log(data));
  return (
    <div>
      orderListPage
    </div>
  );
};

export default OrderListPage;