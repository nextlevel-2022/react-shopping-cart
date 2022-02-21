import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, getProducts } from "@store/features/product/productsSlice";
import { Link } from "react-router-dom";
import Spinner from "@components/spinner";
import styled from "@emotion/styled";
import CART_IMG from "@assets/svgs/cart.svg";
import { v4 as uuid } from "uuid";

const Product = ({ id, price, name, imageUrl }) => {
  return (
    <ProductWrapper to={`products/${id}`}>
      <li>
        <img alt={name} src={imageUrl} />
        <div className="flex justify-between">
          <div className="flex-col">
            <span>{name}</span>
            <span>{price} 원</span>
          </div>
          <img alt="cart_svg" src={CART_IMG} />
        </div>
      </li>
    </ProductWrapper>
  );
};

const ListPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <div class>{error}</div>;
  return (
    <ListWrapper>
      <ListContainer>
        {products.map(product => {
          return (
            <Product
              key={uuid()}
              id={product.id}
              price={product.price}
              name={product.name}
              imageUrl={product.imageUrl}
            />
          );
        })}
      </ListContainer>
    </ListWrapper>
  );
};

export default ListPage;

const ListWrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto;
`;

const ListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ProductWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
`;
