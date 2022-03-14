import { OrderItem } from '../../shared/types';
import Spinner from '../Spinner/Spinner';
import OrderListItem from './OrderListItem';

export interface Props {
  orders: OrderItem[];
  isLoading: boolean;
}

const OrderList = ({ orders, isLoading }: Props) => {
  if (isLoading)
    return (
      <>
        <Spinner />
        로딩중
      </>
    );

  return (
    <div>
      {orders.map((orderItem) => (
        <OrderListItem orderItem={orderItem} />
      ))}
    </div>
  );
};

export default OrderList;
