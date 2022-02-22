import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Product } from '../../shared/types';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import ProductItem from './ProductItem';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const NUMBER_OF_PRODUCTS_ON_ONE_PAGE = 12;

  const flipPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (products.length <= page * NUMBER_OF_PRODUCTS_ON_ONE_PAGE) {
      setIsLastPage(true);
    }
  }, [page]);

  if (products.length === 0) {
    return <div>등록된 제품이 없습니다.</div>;
  }

  return (
    <Container>
      <ProductListContainer>
        {products.slice(0, page * NUMBER_OF_PRODUCTS_ON_ONE_PAGE).map((product) => {
          return <ProductItem key={`product-${product.id}`} product={product} />;
        })}
      </ProductListContainer>
      {!isLastPage && (
        <InfiniteScroll workToDoWhenArrivedBottom={flipPage} isLastPage={isLastPage} />
      )}
    </Container>
  );
};

const Container = styled.div``;

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-content: center;
  justify-content: center;
  margin: 1rem 1rem;
`;

export default ProductList;
