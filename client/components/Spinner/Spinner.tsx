import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { Color } from '../../shared/types';
import { COLOR } from '../../shared/constants/css';

interface Props {
  children?: ReactNode;
  color?: Color;
}

const Spinner = ({ children, color = COLOR.SKY }: Props) => {
  return (
    <Container color={color}>
      <SpinnerStyled color={color} />
      <Text>{children}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerStyled = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid ${(props) => props.color};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

export default Spinner;
