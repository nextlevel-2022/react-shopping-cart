import { useEffect } from 'react';

import useOrders from '../../hooks/service/useOrders';
import OrderList from './OrderList';

const OrderListContainer = () => {
  const { orders, isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <OrderList orders={orders} isLoading={isLoadingOrders} />
    </div>
  );
};

export default OrderListContainer;
