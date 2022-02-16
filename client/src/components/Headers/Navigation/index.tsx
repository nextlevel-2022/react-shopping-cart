import { Link } from "react-router-dom";
import styled from "styled-components";

type NavItem = {
  text: string;
  link: string;
};

interface NavigationProps {
  items: NavItem[];
}

const Navigation = ({ items }: NavigationProps) => {
  return (
    <NavigationWrapper>
      <NavigationContaier>
        {items &&
          items.map((item) => (
            <NavigationItem>
              <Link to={item.link}>{item.text}</Link>
            </NavigationItem>
          ))}
      </NavigationContaier>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.nav`
  color: white;
`;

const NavigationContaier = styled.div`
  display: flex;
`;

const NavigationItem = styled.div`
  margin-left: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

export default Navigation;
