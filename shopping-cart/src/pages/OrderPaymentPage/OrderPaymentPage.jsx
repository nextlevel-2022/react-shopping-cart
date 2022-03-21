import React from 'react';
import { useSelector } from 'react-redux';
import "./OrderPaymentPage.sass";
import API from '../../API';
import { useNavigate } from 'react-router-dom';
// #### 주문/결제
// ​
// - [x] 주문할 상품들의 정보가 보여진다.
// - [x] 총 결제금액을 보여준다.
// - [x] 결제하기 버튼을 클릭하면, confirm 메시지가 보여진다.
//   - [x] 확인 버튼을 누르면, 주문 목록페이지로 이동한다.
const OrderPaymentPage = () => {
  const store = useSelector(state => state.cartReducer.cart);
  const navigate = useNavigate();
  console.log(store)
  let sum = 0;
  store.forEach(product => sum += product.price);
  sum = sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  // reduce 처리 안되는 이유 모르겠음
  const clickHander = (e) => {
    const result = window.confirm("선택한 상품들을 모두 구매하시겠습니까?")
    if (result) {
      const orderDetails = [...store];
      API.postProduct("/orders", {orderDetails})
        .then(res => console.log(res));
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
                )
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