import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./OrderPaymentPage.sass";
import API from '../../API';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../CartPage/cartSlicer.js';

const OrderPaymentPage = () => {
  const store = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sum = store.reduce((acc, cur) => acc + cur.price, 0);
  
  sum = sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  
  const clickHander = (e) => {
    const result = window.confirm("선택한 상품들을 모두 구매하시겠습니까?")
    if (result) {
      const orderDetails = [...store];
      API.postProduct("/orders", {orderDetails})
        .then(res => console.log(res));
      store.forEach(({id}) => {
        dispatch(removeFromCart(id));
      });
      navigate("/orders");
    }
  }

  return (
    <section className="order-section">
        <header className="order-section-header">
          <h2 className="order-section__title">주문/결제</h2>
          <hr className="divide-line mt-20" />
        </header>

        <div className="order-main">
          <section className="order-left-section">
            <h3 className="order-title">주문 상품({store.length}건)</h3>
            <hr className="divide-line-gray mt-10" />

            {store.map(product => {
              if (product) {
                return (
                  <li key={product.id}>
                  <div className="order-container" >
                    <div className="order-container-detail">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div className="order-container-detail-info">
                        <span className="order-name">{product.name}</span>
                        <span>수량: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
          
                  <hr className="divide-line-thin mt-10" />
                  </li>
                );
              }
            })}
          </section>
          <section className="order-right-section">
            <div className="order-right-section__top">
              <h3 className="order-title">결제금액</h3>
            </div>
            <hr className="divide-line-thin" />
            <div className="order-right-section__bottom">
              <div className="order-right-section-info">
                <span className="highlight-text">총 결제금액</span>
                <span className="highlight-text">{sum}원</span>
              </div>
              <div className="order-button">
                <button className="primary-button flex-center" onClick={clickHander}>
                  {sum}원 결제하기
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

  );
};

export default OrderPaymentPage;
