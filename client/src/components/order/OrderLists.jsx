import React from 'react'
import styled from "styled-components";

const PrimaryButtonBlock = styled.div`
  .primary-button {
    background: #2ac1bc;
    font-size: 24px;
    color: white;
    width: 100%;
    padding: 20px;
  }

  .primary-button-small {
    background: #2ac1bc;
    font-size: 20px;
    color: white;
    padding: 14px 28px;
  }
`;

const OrderListsBlock = styled.div`
.order-section {
  padding: 24px 300px;
}

.order-section__title {
  font-size: 24px;
  font-weight: 600;
}

.order-container {
  display: flex;
  justify-content: space-between;
}

.order-title {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.order-name {
  font-size: 20px;
}

.order-info {
  color: #888888;
}

.order-left-section {
  width: 60%;
  margin-top: 50px;
}

.order-right-section {
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;

  border: 1px solid #dddddd;
}

.order-right-section__top {
  display: flex;
  align-items: center;
  padding: 16px 30px;
}

.order-right-section__bottom {
}

.order-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.order-list__header {
  width: 100%;
  padding: 30px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  font-size: 20px;
  background: #f6f6f6;

  border: 1px solid #aaaaaa;
}

.order-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 40px;

  border: 1px solid #aaaaaa;
}

.order-detail-container {
  display: flex;
  justify-content: flex-end;
  margin: 50px 0;
}

.order-detail-title {
  font-size: 24px;
}

`;


const OrderItem = ({ item: { id, price, name, imageUrl, quantity } }) => {
  return (
    <div className="order-list-item" data-id={id}>
      <div className="flex gap-15 mt-10">
        <img className="w-144 h-144" src={imageUrl} alt={name} />
        <div className="flex-col gap-15">
          <span className="order-name">{name}</span>
          <span className="order-info">
            {price.toLocaleString()}원 / 수량: {quantity}개
          </span>
        </div>
      </div>
      <PrimaryButtonBlock>
        <button className="primary-button-small flex-center self-start">장바구니</button>
      </PrimaryButtonBlock>
    </div>
  );
};

const OrderList = ({list: {id: listId, orderDetails }}) => {
  return (
    <div className="order-list">
      <div className="order-list__header">
        <span>주문번호: {listId}</span>
        <span>상세보기 ></span>
      </div>
      {orderDetails.map((item) => {
        return <OrderItem key={listId} item={item} />
      })}
    </div>
  );
}

const OrderLists = ({ isError, isLoading, data, error }) => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
  }
  
  return (
    <OrderListsBlock>
      <section className="order-section">
        <header className="flex-col-center mt-20">
          <h2 className="order-section__title">주문 목록</h2>
          <hr className="divide-line mt-20" />
        </header>
        {data.map((list, idx) => {
          return <OrderList key={idx} list={list} />
        })}
      </section>
    </OrderListsBlock>
  );
};

export default OrderLists
