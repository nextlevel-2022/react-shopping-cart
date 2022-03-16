import React from 'react';
import { useEffect, useState } from 'react';
import API from '../../../API';
import "../OrderListPage.sass";

const OrderListDetailPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    await API.getProduct(window.location.pathname)
      .then(res => res.data)
      .then(data => setOrders([data]));
      console.log(orders)
  }, [])

  const price = () => {
    const result = orders[0].orderDetails.reduce((acc, cur) => acc.price + cur.price);
    return result;
  }

  // 주문 번호 리덕스 전체 orderlist에서 아이디로 번호 받으면 될 것 같음
  return (
    <section className="order-section">
      <header className="order-header">
        <h2 className="order-section__title">주문내역 상세</h2>
        <hr className="divide-line mt-20" />
      </header>
      <div className="order-list">
        <div className="order-list__header">
          <span>주문번호: 1</span>
        </div>
        {orders.map(order => {
          const details = order.orderDetails;
          return details.map(detail => {
            return (
              <div className="order-list-item" key={detail.id}>
                <div className="order-list-item-container">
                  <img
                    src={detail.imageUrl}
                    alt={detail.name}
                  />
                  <div className="order-list-item-info">
                    <span className="order-name">{detail.name}</span>
                    <span className="order-info">{detail.price}원 / 수량: {detail.quantity}개</span>
                  </div>
                </div>
                <button className="order-list-button">
                  장바구니
                </button>
              </div>
            )
          })
        })}
      </div>
      <footer className="order-footer">
        <div className="order-detail">
          <span className="order-detail-title">결제금액 정보</span>
          <hr className="divide-line-thin my-20" />
          <div className="order-detail-text">
            <span className="highlight-text">총 결제금액</span>
            <span className="highlight-text">{price()}원</span>
          </div>
        </div>
      </footer>
    </section>
  )
};

export default OrderListDetailPage;
