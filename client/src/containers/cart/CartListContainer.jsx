import React from 'react'
import CartList from '../../components/cart/CartList';
import apiHandler from "../../lib/api/main";
import { useQuery } from "react-query";

const CartListContainer = () => {
  const { isLoading, isError, data, error } = useQuery(["carts"], () => apiHandler.getCarts());

  return (
    <div>
      <CartList isLoading={isLoading} isError={isError} data={data} error={error} />
    </div>
  );
}

export default CartListContainer
