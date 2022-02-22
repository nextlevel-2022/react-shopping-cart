import { useRouter } from 'next/router';
import styled from 'styled-components';

import { COLOR } from '../../shared/constants/css';
import { URL } from '../../shared/constants/url';

export const GNB = () => {
  const router = useRouter();

  return (
    <Container>
      <LogoContainer>
        <Logo onClick={() => router.push(URL.HOME())}>WOOWA SHOP</Logo>
      </LogoContainer>
      <NavButtonContainer>
        <NavButton onClick={() => router.push(URL.CART())}>장바구니</NavButton>
        <NavButton onClick={() => router.push(URL.ORDER())}>주문목록</NavButton>
      </NavButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${COLOR.GNB};
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7rem;
  color: ${COLOR.WHITE};
`;

const Logo = styled.button`
  font-size: 1.5rem;
  font-weight: 800;
  cursor: pointer;
`;

const LogoContainer = styled.div`
  display: flex;
`;
const NavButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavButton = styled.button`
  color: ${COLOR.WHITE};
  cursor: pointer;
`;

export default GNB;
