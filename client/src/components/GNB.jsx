import React from 'react'
import { useNavigate } from "react-router-dom";

const GNB = () => {
  const history = useNavigate();

  return (
    <div>
      <nav className="nav flex justify-around">
        <div className="flex-center">
          <h1 className="nav-title" onClick={() => history("/")}>
            CLEAN CODE SHOP
          </h1>
        </div>
        <div className="flex gap-15">
          <button className="nav-button" onClick={() => history("/carts")}>
            장바구니
          </button>
          <button className="nav-button" onClick={() => history("/orders")}>
            주문목록
          </button>
        </div>
      </nav>
    </div>
  );
}

export default GNB
