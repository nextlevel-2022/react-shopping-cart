import styled from "styled-components";

interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3.75rem auto;
`;

export default Main;
