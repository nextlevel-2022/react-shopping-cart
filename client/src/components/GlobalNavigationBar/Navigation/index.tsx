import { Link } from "react-router-dom";
import { Wrapper, NavigationItem } from "./style";

type NavItem = {
  text: string;
  link: string;
};

interface NavigationProps {
  items: NavItem[];
}

const Navigation = ({ items }: NavigationProps) => {
  return (
    <Wrapper>
      {items &&
        items.map((item) => (
          <NavigationItem key={item.link}>
            <Link to={item.link}>{item.text}</Link>
          </NavigationItem>
        ))}
    </Wrapper>
  );
};

export default Navigation;
