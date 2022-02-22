import { CartIcon } from "../Icons";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Wrapper, Container } from "./style";

const GlobalNavigationBar = () => {
  return (
    <Wrapper>
      <Container>
        <Logo
          content={"WOOWA SHOP"}
          link="/"
          icon={<CartIcon type={"middle"} />}
        />
        <Navigation
          items={[
            { text: "장바구니", link: "/cartList" },
            { text: "주문목록", link: "/orderList" },
          ]}
        />
      </Container>
    </Wrapper>
  );
};

export default GlobalNavigationBar;
