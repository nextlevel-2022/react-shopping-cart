import { useEffect } from 'react';
import styled from 'styled-components';

import useProducts from '../../hooks/service/useProducts';
import Spinner from '../Spinner/Spinner';
import ProductList from './ProductList';

const ProductListContainer = () => {
  const { products, getProducts, isLoadingProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoadingProducts)
    return (
      <Spinner>
        <p>로딩중</p>
      </Spinner>
    );

  return (
    <Container>
      <ProductList products={products} />
    </Container>
  );
};

const Container = styled.div``;

export default ProductListContainer;
