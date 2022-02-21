import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import CART_IMG from "@assets/svgs/cart.svg";

const navItems = [
  { text: "장바구니", url: "/cart" },
  { text: "주문목록", url: "/orderList" },
];

const Navigation = () => {
  return (
    <NavWrapper>
      <NavContainer>
        <div className="flex">
          <NavLink to="/" className="flex">
            <LogoImg alt="cart_svg" src={CART_IMG} />
            <LogoTitle>Clean Code Shop</LogoTitle>
          </NavLink>
        </div>
        <nav className="flex">
          <ul className="flex gap-10">
            {navItems.map((item, id) => {
              return (
                <NavButton key={id}>
                  <NavLink to={item.url}>{item.text}</NavLink>
                </NavButton>
              );
            })}
          </ul>
        </nav>
      </NavContainer>
    </NavWrapper>
  );
};

export default Navigation;

const NavWrapper = styled.div`
  width: 100%;
  height: 80px;
  margin: 0 auto;
  background: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  color: #ffffff;
`;

const LogoImg = styled.img`
  width: 50px;
  filter: brightness(0) invert(1);
`;

const LogoTitle = styled.h1`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  vertical-align: middle;
`;

const NavButton = styled.li`
  font-weight: 500;
  font-size: 24px;
`;
