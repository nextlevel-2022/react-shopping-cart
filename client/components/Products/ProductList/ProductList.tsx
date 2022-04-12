import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useCarts from '../../../hooks/service/useCarts';
import { Product } from '../../../shared/types';
import ScrollBottomObserver from '../../@atom/ScrollBottomObserver/ScrollBottomObserver';
import Spinner from '../../@atom/Spinner/Spinner';
import ProductItem from '../ProductItem/ProductItem';

export interface Props {
  /**상품들의 리스트(Product[])*/
  products: Product[];
  /**Products가 로딩인중인지 알려주는 값*/
  isLoadingProducts: boolean;
}

const ProductList = ({ products, isLoadingProducts }: Props) => {
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const { addCarts } = useCarts();

  const NUMBER_OF_PRODUCTS_ON_ONE_PAGE = 12;

  const flipPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (products.length <= page * NUMBER_OF_PRODUCTS_ON_ONE_PAGE) {
      setIsLastPage(true);
    }
  }, [page]);

  if (isLoadingProducts)
    return (
      <Spinner>
        <p>로딩중</p>
      </Spinner>
    );

  if (products.length === 0) {
    return <div>등록된 제품이 없습니다.</div>;
  }

  return (
    <Container>
      <ProductListContainer>
        {products.slice(0, page * NUMBER_OF_PRODUCTS_ON_ONE_PAGE).map((product) => {
          return (
            <ProductItem
              key={`product-${product.id}`}
              product={product}
              onClickAddCartButton={() => addCarts(product)}
            />
          );
        })}
      </ProductListContainer>
      {!isLastPage && <ScrollBottomObserver workToDoWhenArrivedBottom={flipPage} msToDelayExecuteScrollHandler={200} />}
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
