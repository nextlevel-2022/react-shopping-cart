import { CartIcon } from "src/components/Icons";
import Logo from "src/components/GlobalNavigationBar/Logo";
import { replaceCurrencyFormat } from "src/utils";
import { Link } from "react-router-dom";
import { Product } from "../../types/dto";
import { Wrapper, Container } from "./style";

const ProductListCard = ({ id, price, name, imageUrl }: Product) => {
  return (
    <Wrapper className="product-list-item">
      <Container>
        <div className="product-image-area">
          <Link to={`/prduct/${id}`}>
            <img src={imageUrl} alt="product-image" />
          </Link>
        </div>
        <div className="product-info-area">
          <div className="product-desc-group">
            <Link to={`/prduct/${id}`}>
              <p className="item-name">{name}</p>
              <p className="item-price">
                {replaceCurrencyFormat(price)}&nbsp;원
              </p>
            </Link>
          </div>
          <div className="product-logo-group">
            <Logo
              link="/cartList"
              icon={<CartIcon type={"small"} fill={"#000"} />}
            />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default ProductListCard;
