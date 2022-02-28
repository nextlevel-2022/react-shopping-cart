import React from 'react';
import { useGetProductList } from '@/api/queries';

const ProductList = () => {
  
  const { data, error, isLoading } = useGetProductList();
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <section className="product-container">
      {data?.map((product) => (
        <div className="product-item" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <div className="flex justify-between p-5">
            <div className="product-info">
              <span className="product-info__name">{product.name}</span>
              <span className="product-info__price">{product.price}원</span>
            </div>
              <img src="../assets/svgs/cart.svg" alt="장바구니" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductList;
