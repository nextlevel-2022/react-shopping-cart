import React from 'react'
import { useNavigate } from "react-router-dom";
import styled, { css } from 'styled-components';

const GNBBlock = styled.div`
  .nav {
    width: 100%;
    height: 80px;

    background: #2ac1bc;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  }

  .nav-title {
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;

    color: #ffffff;
  }

  .nav-button {
    font-weight: 500;
    font-size: 24px;

    color: #ffffff;
  }
`;


const GNB = () => {
  const history = useNavigate();

  return (
    <div>
      <GNBBlock>
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
      </GNBBlock>
    </div>
  );
}

export default GNB
