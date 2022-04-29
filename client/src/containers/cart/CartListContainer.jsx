import React, { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../../components/cart/CartList";
import apiHandler from "../../lib/api/main";
import { decrease, increase, toggle, toggleAll, deleteItem } from "../../modules/cartCounter";

const CartListContainer = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["carts"], () => apiHandler.getCarts());

  const { mutate, mutateAsync, error: mutateError } = useMutation(id => {
      return apiHandler.deleteCart({id});
  }, {
      onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    }
  });
  
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
  const onToggle = useCallback(
    id => {
      dispatch(toggle(String(id)))
    }
  )
  const onToggleAll = useCallback(
    isChecked => {
      dispatch(toggleAll(isChecked))
    }
  )
  const onDelete = useCallback(
    (id) => {
      const isConfirm = confirm('삭제하시겠습니까?')
      if (isConfirm) {
        mutate(id, {
          onSuccess: () => {
            setTimeout(() => dispatch(deleteItem(id)), 1000);
          },
        });
      }
    }
  )

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
        onToggle={onToggle}
        onToggleAll={onToggleAll}
        onDelete={onDelete}
      />
    </div>
  );
};

export default CartListContainer;
