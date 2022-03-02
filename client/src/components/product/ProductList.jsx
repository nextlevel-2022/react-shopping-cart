import React from "react";
import styled from "styled-components";
import CartSvg from '../../assets/svgs/cart.svg';

const ProductListBlock = styled.div`
  .product-container {
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
    gap: 20px;
    padding: 50px 240px;

    display: grid;
    gap: 20px 20px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    .product-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 480px) {
    .product-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  .product-info__name {
    font-size: 12px;
  }

  .product-info__price {
  }

  .product-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
  }

  .product-detail-info {
    width: 100%;
  }

  .product-detail-info__name {
    font-size: 24px;
  }

  .product-detail-info__price {
    font-size: 24px;
  }

  .product-detail-button {
    width: 100%;
    padding: 24px;
    background: #73675c;
    font-size: 24px;
    color: white;
  }
`;

const ProductItem = ({ product: { id, name, price, imageUrl } }) => {
  return (
    <div data-id={id}>
      <img src={imageUrl} alt={name} />
      <div className="flex justify-between p-5">
        <div className="product-info">
          <span className="product-info__name">{name}</span>
          <span className="product-info__price">{price.toLocaleString()}원</span>
        </div>
        <img src={CartSvg} alt="장바구니" />
      </div>
    </div>
  );
};

const ProductList = ({ isError, isLoading, data, error }) => {
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ProductListBlock>
      <div>
        <section className="product-container">
          {data.map((product, idx) => {
            return <ProductItem key={idx} product={product} />;
          })}
        </section>
      </div>
    </ProductListBlock>
  );
};

export default ProductList;
