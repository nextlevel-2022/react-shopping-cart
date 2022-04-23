import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./GNB.sass"

const GNB = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.target.className === "logo") {
      navigate("/");
    } else if (e.target.className === "cart") {
      navigate("cart");
    } else if (e.target.className === "order") {
      navigate("orders");
    }
  }
  return (
    <header className="GNB" onClick={onClick}>
      <div className="logo">
        CLEANCODE SHOP
      </div>
      <div className="cart">
        장바구니
      </div>
      <div className="order">
        주문목록
      </div>
    </header>
  );
};

export default GNB;