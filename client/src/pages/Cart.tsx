import React from 'react';
import Header from '@/components/common/Header';
import Cart from '@/components/cart';

const CartPage = () => {
  return (
    <div className="page">
      <Header title="장바구니" />
      <Cart />
    </div>
  );
};

export default CartPage;
