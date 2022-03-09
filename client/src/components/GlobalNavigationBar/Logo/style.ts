import styled from "styled-components";

export const Wrapper = styled.div`
  color: white;
  font-weight: 900;
  display: block;
  font-size: 2.5rem;

  @media screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  .text-content {
    padding: 1rem;
  }
`;
