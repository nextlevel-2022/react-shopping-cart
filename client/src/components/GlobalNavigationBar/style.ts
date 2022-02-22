import styled from "styled-components";

export const Wrapper = styled.nav`
  position: sticky;
  z-index: 9999;
  top: 0;
  background-color: #2ac1bc;
  justify-content: center;
  height: 5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: inherit;
  width: 100%;
  margin: 0 auto;
`;
