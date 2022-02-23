import React from 'react';
import ProductList from '@/components/product';
import Header from '@/components/common/Header';

const ProductListPage = () => {
  return (
    <div className="page">
      <Header title="상품목록" />
      <ProductList />;
    </div>
  );
};

export default ProductListPage;
