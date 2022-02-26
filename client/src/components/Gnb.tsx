import React from 'react';
import { Link } from 'react-router-dom';

export function Gnb() {
  return (
    <div>
      <h1 className="text"> WOOWA SHOP</h1>
      <span>
        <Link to="/cart">장바구니</Link>
        <Link to="/cart">주문목록</Link>
      </span>
    </div>
  );
}
