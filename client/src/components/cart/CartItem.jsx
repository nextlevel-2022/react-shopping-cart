import React from "react";
import TrashSvg from "../../assets/svgs/trash.svg";

const CartItem = ({ item: { id: cartId, product }, cartItem, onIncrease, onDecrease }) => {
  const { name, price, imageUrl } = product;
  const { quantity, isChecked } = cartItem;
  const totalPrice = price * quantity;

  return (
    <>
      <div className="cart-container">
        <div className="flex gap-15 mt-10">
          <input className="checkbox" name="checkbox" type="checkbox" />
          <img className="w-144 h-144" src={imageUrl} alt={name} />
          <span className="cart-name">{name}</span>
        </div>
        <div className="flex-col-center justify-end gap-15">
          <img className="cart-trash-svg" src={TrashSvg} alt="삭제" />
          <div className="number-input-container">
            <input type="number" className="number-input" value={quantity} readOnly />
            <div>
              <button className="number-input-button" onClick={() => onIncrease(cartId)}>
                ▲
              </button>
              <button className="number-input-button" onClick={() => onDecrease(cartId)}>
                ▼
              </button>
            </div>
          </div>
          <span className="cart-price">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>
      <hr className="divide-line-thin mt-10" />
    </>
  );
};

export default CartItem;
