import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/cart/CartList";
import apiHandler from "../../lib/api/main";
import { decrease, increase } from "../../modules/cartCounter";

const CartListContainer = () => {
  const { isLoading, isError, data, error } = useQuery(["carts"], () => apiHandler.getCarts());

  const cartState = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const onIncrease = useCallback(
    id => {
      dispatch(increase(String(id)));
    },
    [dispatch],
  );
  const onDecrease = useCallback(
    id => {
      dispatch(decrease(String(id)));
    },
    [dispatch],
  );

  return (
    <div>
      <CartList
        isLoading={isLoading}
        isError={isError}
        data={data}
        error={error}
        cartState={cartState}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </div>
  );
};

export default CartListContainer;
