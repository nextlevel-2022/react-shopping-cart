import React from 'react';
import { Link } from 'react-router-dom';

export function Gnb() {
  return (
    <div className="bg-primary-200">
      <div className="container flex py-3 items-center">
        <Link to="/">
          <h1 className="text-2xl text-white font-bold"> WOOWA SHOP</h1>
        </Link>
        <span className="flex gap-x-6 ml-auto">
          <Link className="text-lg text-white font-medium" to="/cart">
            장바구니
          </Link>
          <Link className="text-lg text-white font-medium" to="/order">
            주문목록
          </Link>
        </span>
      </div>
    </div>
  );
}
