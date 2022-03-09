import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 5vh;
  @media screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 0.5rem 0;
  }
`;

const Container = styled.ul`
  max-width: ${({ theme }) => theme.size.maxWidth};
  display: flex;
  flex-wrap: wrap;
`;

export { Wrapper, Container };
