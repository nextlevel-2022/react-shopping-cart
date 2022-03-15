import React, { useEffect, useState } from 'react';
import API from '../../API';
import CartModal from '../../common/Modal/CartModal';
import "./OrderListPage.sass";
// #### 주문목록
// ​
// - [x] 주문 정보들이 보여진다.
// - [x] 장바구니 버튼을 클릭하면, 해당 상품이 장바구니에 담기고 장바구니 이동 선택 모달이 보여진다.
//   - [x] 장바구니 이동 버튼을 누르면 장바구니 페이지로 이동한다.

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(false)
  useEffect(async() => {
    await API.getProduct("/orders")
    .then(res => res.data)
    .then(data => setOrders(data));
  }, [])
  
  const clickCart = async (product) => {
    setActive(true);
    document.body.style = "overflow: hidden"
    API.postProduct("/carts",{product})
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  return (
    <>
    {active && <CartModal setActive={setActive}/>}
    <section className="order-section">
      <header className="order-header">
        <h2 className="order-section__title">주문 목록</h2>
        <hr className="divide-line mt-20" />
      </header>

      {orders.map((order, index) => {
        if (!order.orderDetails.length) return;
        const details = order.orderDetails;
        return(
          <div className="order-list" key={index}>
            <div className="order-list__header">
              <span>주문번호: {index + 1}</span>
              <span className="order-list__header-detail">상세보기 </span>
            </div>
            {details.map(detail => {
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
                  <button className="order-list-button" onClick={() => clickCart(detail)}>
                    장바구니
                  </button>
                </div>
              )
            })}
            
          </div>
        )
      })}

    </section>
    </>
    
  );
};

export default OrderListPage;

