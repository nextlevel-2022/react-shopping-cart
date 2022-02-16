import styled from "styled-components";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Headers = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo content={"WOOWA SHOP"} link="/" />
        <Navigation
          items={[
            { text: "장바구니", link: "/cartList" },
            { text: "주문목록", link: "/orderList" },
          ]}
        />
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: #2ac1bc;
  justify-content: center;
  height: 5rem;
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: inherit;
`;

export default Headers;
