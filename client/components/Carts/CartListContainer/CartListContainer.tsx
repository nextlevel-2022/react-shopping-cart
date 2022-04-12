import { useEffect } from 'react';

import useCarts from '../../../hooks/service/useCarts';
import CartList from '../CartList/CartList';

const CartListContainer = () => {
  const { carts, isLoadingCarts, getCarts } = useCarts();

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div>
      <CartList carts={carts} isLoading={isLoadingCarts} />
    </div>
  );
};

export default CartListContainer;
