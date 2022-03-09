import { Link } from "react-router-dom";
import { Wrapper, Container } from "./style";

interface LogoProps {
  link: string;
  content?: string;
  icon?: React.ReactNode;
}

const Logo = ({ content, link, icon }: LogoProps) => {
  return (
    <Wrapper>
      <Link to={link}>
        <Container>
          {icon}
          {content && <div className="text-content">{content}</div>}
        </Container>
      </Link>
    </Wrapper>
  );
};

export default Logo;
