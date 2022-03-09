import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "src/components/Icons";
import { RootState } from "src/sagas";
import { deleteCart, getCarts } from "src/sagas/carts";
import { Cart } from "src/types/dto";
import { replaceCurrencyFormat } from "src/utils";
import { Wrapper, Container } from "./style";

type fetchingCartType = {
  loading: boolean;
  data: Cart[];
  error: boolean;
};

const CartListPage = () => {
  const { loading, data, error }: fetchingCartType = useSelector(
    (state: RootState) => state.carts["carts"]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  const deleteButtonHanlder = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!confirm("해당 상품을 삭제하시겠습니까?")) {
      return;
    }

    if (
      !(
        event.target instanceof HTMLDivElement ||
        event.target instanceof SVGElement
      )
    ) {
      return;
    }

    const { cartId } = (event.target.closest(".icon-container") as HTMLElement)
      .dataset;

    dispatch(deleteCart(Number(cartId)));
    dispatch(getCarts());
  };

  const carts = useMemo(() => data, [data]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return <div>로딩중...</div>;

  return (
    <Wrapper>
      <Container>
        <div className="title">장바구니</div>
        <div className="cart-list-section">
          <div className="cart-list-item-area">
            <div className="cart-list-select-group">
              <div className="select-box">
                <input type="checkbox" id="deselect" />
                <label htmlFor="deselect">선택해제</label>
              </div>
              <button className="delete-button">상품삭제</button>
            </div>
            <div className="cart-list-item-group">
              <div className="subtitle">든든배송 상품({carts.length}개)</div>
              <ul className="cart-list-item-list">
                {carts &&
                  carts.map(({ id, product }) => (
                    <li className="item-list">
                      <input type="checkbox" />
                      <div className="item-info">
                        <div className="img-container">
                          <img src={product.imageUrl} />
                        </div>
                        <p className="item-title">{product.name}</p>
                      </div>
                      <div className="item-control">
                        <div className="icon-wrapper">
                          <div
                            className="icon-container"
                            data-cart-id={id}
                            onClick={deleteButtonHanlder}
                          >
                            <TrashIcon />
                          </div>
                        </div>
                        <div className="select-box">
                          <div className="cart-quantity">1</div>
                        </div>
                        <div className="price">{product.price}원</div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="cart-list-price-area">
            <div className="price-table">
              <div className="price-table-head">
                <span>결제 예상 금액</span>
              </div>
              <div className="price-table-body">
                <div className="sub-title">
                  <span>결제예상금액</span>
                  <span>{replaceCurrencyFormat(21700)}원</span>
                </div>
                <button>주문하기(2개)</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default CartListPage;
