import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { selectProducts, getProducts } from "@store/features/product/productsSlice";
import Spinner from "@components/spinner";
import styled from "@emotion/styled";
import CART_IMG from "@assets/svgs/cart.svg";
import { v4 as uuid } from "uuid";
import { PAGING_ATTRIBUTE } from "@common/constants";

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

const ProductListPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  const itemPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [sliceBegin, setSliceBegin] = useState(itemPerPage * currentPage);
  const [sliceEnd, setSliceEnd] = useState(itemPerPage * (currentPage + 1));

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  const handlePageClick = event => {
    const pageNumber = event.selected;
    setCurrentPage(pageNumber);
    setSliceBegin(pageNumber * itemPerPage);
    setSliceEnd((pageNumber + 1) * itemPerPage);
  };

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <div class>{error}</div>;
  return (
    <ListWrapper>
      <ListContainer>
        {products.slice(sliceBegin, sliceEnd).map(product => {
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

      <CustomPaging
        breakLabel={PAGING_ATTRIBUTE.BREAK_LABEL}
        previousLabel={PAGING_ATTRIBUTE.PREV_LABEL}
        nextLabel={PAGING_ATTRIBUTE.NEXT_LABEL}
        onPageChange={handlePageClick}
        pageRangeDisplayed={PAGING_ATTRIBUTE.PAGE_RANGE_DISPLAYED}
        pageCount={Math.ceil(products.length / itemPerPage)}
      />
    </ListWrapper>
  );
};

export default ProductListPage;

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

const CustomPaging = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
  font-size: 24px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);

    a {
      padding: 20px 25px;
    }
  }

  li.previous,
  li.next {
    font-weight: 900;
  }

  li.selected {
    background-color: #2ac1bc;
  }
`;
