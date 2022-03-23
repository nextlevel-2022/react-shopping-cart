import { useEffect } from 'react';
import styled from 'styled-components';

import useProducts from '../../../hooks/service/useProducts';
import ProductList from '../ProductList/ProductList';

const ProductListContainer = () => {
  const { products, getProducts, isLoadingProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <ProductList products={products} isLoadingProducts={isLoadingProducts} />
    </Container>
  );
};

const Container = styled.div``;

export default ProductListContainer;
