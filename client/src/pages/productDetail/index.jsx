import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct, getProductById } from "@store/features/product/productSlice";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Spinner from "@/components/spinner";

const ProductDetailItem = ({ product }) => {
  const { name, price, imageUrl } = product;

  return (
    <div className="flex-col-center w-520">
      <img className="w-480 h-480 mb-10" alt={name} src={imageUrl} />
      <div
        css={css`
          width: 100%;
        `}
      >
        <span
          css={css`
            font-size: 24px;
          `}
        >
          {name}
        </span>
        <hr
          className="my-20"
          css={css`
            width: 100%;
            border: 2px solid #aaaaaa;
          `}
        />
        <div className="flex justify-between">
          <span>금액</span>
          <span
            css={css`
              font-size: 24px;
            `}
          >
            {price}
          </span>
        </div>
      </div>
      <ProductDetailButton type="button">장바구니</ProductDetailButton>
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const status = useSelector(state => state.product.status);
  const error = useSelector(state => state.product.error);

  useEffect(() => {
    if (productId !== String(product.id)) {
      dispatch(getProductById(productId));
    }
  }, [product, productId, dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <div class>{error}</div>;
  return (
    <DetailProductContainer>
      <ProductDetailItem product={product} />
    </DetailProductContainer>
  );
};

export default ProductDetail;

const DetailProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProductDetailButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 24px 0;
  margin-top: 20px;
  background: #73675c;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
