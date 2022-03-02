import React from 'react'
import ProductList from '../../components/product/ProductList';
import apiHandler from '../../lib/api/main';
import { useQuery } from 'react-query';

const ProductListContainer = () => {
  const { isLoading, isError, data, error } = useQuery(["products"], () => apiHandler.getProducts());
  return (
    <div>
      <ProductList isLoading={isLoading} isError={isError} data={data} error={error}  />
    </div>
  )
}

export default ProductListContainer
