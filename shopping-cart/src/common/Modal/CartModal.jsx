import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CartModal.sass"

const CartModal = ({setActive}) => {
  const navigate = useNavigate();
  const buttonHandler = (e) => {
    const button = e.target.id;
    document.body.style = "overflow: auto"
    if (button === "stay") {
      setActive(false);
      return;
    }
    setActive(true);
    navigate("/cart")
  }
  return (
    <div className="modal-container">
      <div className="modal">
        <span>장바구니로 이동하시겠습니까?</span>
        <div className="buttons" onClick={buttonHandler}>
          <button id="move">이동하기</button>
          <button id="stay">쇼핑하기</button> 
        </div>
        
      </div>
    </div>
  );
};

export default CartModal;