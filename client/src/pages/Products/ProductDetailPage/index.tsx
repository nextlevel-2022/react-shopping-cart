import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "src/modules";
import { replaceCurrencyFormat } from "src/utils";
import { Product } from "../../../types/dto";
import { Wrapper, Container } from "./style";

type fetchingProductsType = {
  data: Product[];
};

const ProductDetailPage = () => {
  const params = useParams();
  const { id } = params;

  const { data }: fetchingProductsType = useSelector(
    (state: RootState) => state.products["products"]
  );

  const product = data.find((d) => d.id === Number(id));

  return (
    <Wrapper>
      <Container>
        {product && (
          <>
            <div className="product-info-area">
              <div className="product-image-container">
                <img src={product.imageUrl} alt="product-image" />
              </div>
              <div className="product-name">{product.name}</div>
            </div>
            <div className="add-cart-area">
              <div className="product-price">
                <span className="price-title">금액</span>
                <span className="price-value">
                  {replaceCurrencyFormat(product.price)}원
                </span>
              </div>
            </div>
            <button className="add-cart-button">장바구니</button>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default ProductDetailPage;
