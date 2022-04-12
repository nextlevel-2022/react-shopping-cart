import { useEffect } from 'react';

import useOrders from '../../../hooks/service/useOrders';
import OrderList from '../OrderList/OrderList';

const OrderListContainer = () => {
  const { orders, isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <OrderList orders={orders} isLoading={isLoadingOrders} />
    </>
  );
};

export default OrderListContainer;
