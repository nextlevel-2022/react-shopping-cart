import Logo from "src/components/GlobalNavigationBar/Logo";
import { TrashIcon } from "src/components/Icons";
import { replaceCurrencyFormat } from "src/utils";
import { Wrapper, Container } from "./style";

const CartListPage = () => {
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
            {/* 더미데이터입니다 */}
            <div className="cart-list-item-group">
              <div className="subtitle">든든배송 상품(3개)</div>
              <ul className="cart-list-item-list">
                <li className="item-list">
                  <input type="checkbox" />
                  <div className="item-info">
                    <div className="img-container">
                      <img src="https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg" />
                    </div>
                    <p className="item-title">[든든] 야채바삭 김말이 700g</p>
                  </div>
                  <div className="item-control">
                    <Logo link="/" icon={<TrashIcon />} />
                    <div className="select-box">
                      <div>1</div>
                    </div>
                    <div className="price">8,400원</div>
                  </div>
                </li>
                <li className="item-list">
                  <input type="checkbox" />
                  <div className="item-info">
                    <div className="img-container">
                      <img src="https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg" />
                    </div>
                    <p className="item-title">[든든] 야채바삭 김말이 700g</p>
                  </div>
                  <div className="item-control">
                    <Logo link="/" icon={<TrashIcon />} />
                    <div className="select-box">
                      <div>1</div>
                    </div>
                    <div className="price">8,400원</div>
                  </div>
                </li>
                <li className="item-list">
                  <input type="checkbox" />
                  <div className="item-info">
                    <div className="img-container">
                      <img src="https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg" />
                    </div>
                    <p className="item-title">[든든] 야채바삭 김말이 700g</p>
                  </div>
                  <div className="item-control">
                    <Logo link="/" icon={<TrashIcon />} />
                    <div className="select-box">
                      <div>1</div>
                    </div>
                    <div className="price">8,400원</div>
                  </div>
                </li>
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
