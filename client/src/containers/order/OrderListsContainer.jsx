import React from 'react'
import apiHandler from "../../lib/api/main";
import { useQuery } from "react-query";
import OrderLists from '../../components/order/OrderLists';

const OrderListsContainer = () => {
  const { isLoading, isError, data, error } = useQuery(["orders"], () => apiHandler.getOrders());

  return (
    <div>
      <OrderLists isLoading={isLoading} isError={isError} data={data} error={error} />
    </div>
  );
}

export default OrderListsContainer
