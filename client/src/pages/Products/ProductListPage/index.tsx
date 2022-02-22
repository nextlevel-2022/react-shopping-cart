import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "src/modules/products";
import { RootState } from "src/modules";
import { Product } from "../../../types/dto";
import { ProductComponent } from "../../../components";
import { Wrapper, Container } from "./style";

type fetchingProductType = {
  loading: boolean;
  data: Product[];
  error: boolean;
};

const ProductListPage = () => {
  const { loading, data, error }: fetchingProductType = useSelector(
    (state: RootState) => state.products["products"]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return <div>로딩중...</div>;

  return (
    <Wrapper className="product-list-area">
      <Container className="product-list-group">
        {data &&
          data.map((product: Product) => (
            <ProductComponent key={product.id} {...product} />
          ))}
      </Container>
    </Wrapper>
  );
};

export default ProductListPage;
