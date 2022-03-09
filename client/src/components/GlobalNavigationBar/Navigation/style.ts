import styled from "styled-components";

export const Wrapper = styled.ul`
  color: white;
  display: flex;
  margin-right: 1rem;
`;

export const NavigationItem = styled.li`
  margin-left: 2rem;
  font-weight: 500;
  font-size: 1.5rem;

  @media screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    margin-left: 1.5rem;
    font-size: 1rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    margin-left: 1rem;
    font-size: 1rem;
  }
`;
