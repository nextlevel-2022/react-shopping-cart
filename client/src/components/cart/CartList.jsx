import React from "react";
import styled from "styled-components";
import TrashSvg from "../../assets/svgs/trash.svg";


const CartListBlock = styled.div`
  .cart-section {
    padding: 24px 300px;
  }

  .cart-section__title {
    font-size: 24px;
    font-weight: 600;
  }

  .delete-button {
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  }

  .cart-left-section {
    width: 60%;
    margin-top: 50px;
  }

  .cart-right-section {
    width: 35%;
    height: 260px;
    margin-left: 5%;
    margin-top: 80px;

    border: 1px solid #dddddd;
  }

  .cart-right-section__top {
    display: flex;
    align-items: center;
    padding: 16px 30px;
  }

  .cart-right-section__bottom {
  }

  .cart-title {
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .cart-container {
    display: flex;
    justify-content: space-between;
  }

  .cart-trash-svg {
    align-self: flex-end;
  }

  .cart-name {
    font-size: 20px;
  }

  .cart-price {
    color: #333333;
    align-self: flex-end;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
  }

  .checkbox {
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
  }

  .checkbox:focus {
    outline: none;
  }

  .checkbox:checked {
    background-color: #2ac1bc;
  }

  .checkbox:after {
    content: "✔";
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkbox-label {
    padding-left: 7px;
  }

  .number-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .number-input {
    width: 72px;
    height: 58px;
    border: 1px solid #dddddd;
    text-align: center;
    font-size: 24px;
  }

  .number-input-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    border: 1px solid #dddddd;
    font-size: 100%;
    cursor: pointer;
  }

  .number-input-button:focus {
    outline: none;
  }
`;

const CartItem = ({item:{ id: cartId, product }}) => {
  const { name, price, imageUrl, id } = product;

  return (
    <>
      <div className="cart-container">
        <div className="flex gap-15 mt-10">
          <input className="checkbox" name="checkbox" type="checkbox" checked="true" />
          <img className="w-144 h-144" src={imageUrl} alt={name} />
          <span className="cart-name">{name}</span>
        </div>
        <div className="flex-col-center justify-end gap-15">
          <img className="cart-trash-svg" src={TrashSvg} alt="삭제" />
          <div className="number-input-container">
            <input type="number" className="number-input" value="1" />
            <div>
              <button className="number-input-button">▲</button>
              <button className="number-input-button">▼</button>
            </div>
          </div>
          <span className="cart-price">{price.toLocaleString()}원</span>
        </div>
      </div>
      <hr className="divide-line-thin mt-10" />
    </>
  );
};

const CartList = ({ isError, isLoading, data, error }) => {
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  let totalCount = 0;
  const totalPrice = data.reduce((acc, { id, product: { price } }, idx) => {
    totalCount++
    return acc + price
  }, 0)
  

  return (
    <CartListBlock>
      <section className="cart-section">
        <header className="flex-col-center mt-20">
          <h2 className="cart-section__title">장바구니</h2>
          <hr className="divide-line mt-20" />
        </header>

        <div className="flex">
          <section className="cart-left-section">
            <div className="flex justify-between items-center">
              <div className="checkbox-container">
                <input className="checkbox" name="checkbox" type="checkbox" checked="true" />
                <label className="checkbox-label" for="checkbox">
                  선택해제
                </label>
              </div>
              <button className="delete-button">상품삭제</button>
            </div>
            <h3 className="cart-title">든든배송 상품({totalCount}개)</h3>
            <hr className="divide-line-gray mt-10" />
            {data.map((item, idx) => {
              return <CartItem key={idx} item={item} />;
            })}
          </section>
          <section className="cart-right-section">
            <div className="cart-right-section__top">
              <h3 className="cart-title">결제예상금액</h3>
            </div>
            <hr className="divide-line-thin" />
            <div className="cart-right-section__bottom">
              <div className="flex justify-between p-20 mt-20">
                <span className="highlight-text">결제예상금액</span>
                <span className="highlight-text">{totalPrice}원</span>
              </div>
              <div className="flex-center mt-30 mx-10">
                <button className="primary-button flex-center">주문하기({totalCount}개)</button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </CartListBlock>
  );
};

export default CartList;
