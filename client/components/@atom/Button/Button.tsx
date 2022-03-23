import { MouseEventHandler } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { BUTTON_SIZE, COLOR } from '../../../shared/constants/css';
import { ButtonSize, Color } from '../../../shared/types';

const SIZES = {
  [BUTTON_SIZE.SMALL]: css`
    font-size: 0.875rem;
    --button-padding: 8px 12px;
  `,
  [BUTTON_SIZE.MEDIUM]: css`
    font-size: 1rem;
    padding: 12px 16px;
  `,
  [BUTTON_SIZE.LARGE]: css`
    font-size: 1.25rem;
    padding: 16px 20px;
  `,
};

interface Props {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSize;
  backgroundColor?: Color;
  textColor?: Color;
}

const Button = ({
  children,
  size = BUTTON_SIZE.MEDIUM,
  backgroundColor = COLOR.MINT_500,
  textColor = COLOR.WHITE,
  onClick,
}: Props) => {
  const sizeStyle = SIZES[size];

  return (
    <ButtonStyled sizeStyle={sizeStyle} backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{
  sizeStyle: FlattenSimpleInterpolation;
  backgroundColor: Color;
  textColor: Color;
}>`
  ${({ sizeStyle }) => sizeStyle};
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    opacity: 0.7;
  }
`;

export default Button;
