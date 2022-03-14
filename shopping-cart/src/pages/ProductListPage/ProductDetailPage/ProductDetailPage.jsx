import React, { useEffect, useState } from 'react';
import API from '../../../API';
import "../ProductListPage.sass"

const ProductDetailPage = () => {
  const [product, setProduct] = useState([]);

  useEffect(async () => {
    await API.getProduct(window.location.pathname)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, []);

  const onClick = async() => {
    await API.postProduct("/carts", {product})
      .catch(error => console.log(error));
  }

  return (
    <section className="product-detail-container">
      <div className="product-detail-img">
        <img src={product.imageUrl} />
      </div>
      <div className="product-detail-name">
        {product.name}
      </div>
      <div className="product-detail-price">
        <span>금액</span>
        <span>
          {product.price}
        </span>
        
      </div>
      <button className="product-detail-button" onClick={onClick}>
        장바구니
      </button>
    </section>
  );
};

export default ProductDetailPage;
