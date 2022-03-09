import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};

  .product-info-area {
    padding: 0 1.5rem 1rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 99%;
      border: 2px solid #aaa;
    }
  }

  .product-image-container {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .product-name {
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: -0.5px;
    line-height: 2rem;
    margin: 1rem 0;
  }

  .add-cart-area {
    padding: 1.5rem 1.5rem;

    .product-price {
      display: flex;
      justify-content: space-between;

      span {
        display: inline-block;
      }

      .price-title {
        font-size: 1.5rem;
        line-height: 1.5rem;
        letter-spacing: -0.5px;
        font-weight: 400;
      }

      .price-value {
        font-weight: 400;
        font-size: 2rem;
        letter-spacing: -0.5px;
        text-align: right;
      }
    }
  }

  .add-cart-button {
    width: 100%;
    color: white;
    background-color: #73675c;
    height: 6vh;
    font-weight: 700;
    font-size: 2rem;
    text-align: center;
    border: none;
  }
`;

export { Wrapper, Container };
