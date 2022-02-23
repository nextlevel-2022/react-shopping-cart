import React from 'react';
import { NavLink } from 'react-router-dom';

const GNB = () => {
  return (
    <nav className="nav flex justify-around">
      <NavLink className="flex-center" to="/">
        <h1 className="nav-title">CLEAN CODE SHOP</h1>
      </NavLink>
      <div className="flex gap-15">
        <NavLink className="nav-button" to="/cart">
          장바구니
        </NavLink>
        <NavLink className="nav-button" to="/order">
          주문목록
        </NavLink>
      </div>
    </nav>
  );
};

export default GNB;
