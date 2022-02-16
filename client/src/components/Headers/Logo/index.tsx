import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartIcon } from "../../Icons";

interface LogoProps {
  content: string;
  link: string;
}

const Logo = ({ content, link }: LogoProps) => {
  return (
    <LogoWrapper>
      <Link to={link}>
        <LogoContainer>
          <CartIcon />
          <LogoTextContent>{content}</LogoTextContent>
        </LogoContainer>
      </Link>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  color: white;
  font-weight: 900;
  font-size: 2.5rem;
  display: block;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoTextContent = styled.div`
  padding: 1rem;
`;

export default Logo;
