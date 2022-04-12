import { MouseEventHandler } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { BUTTON_SIZE, COLOR } from '../../../shared/constants/css';
import { ButtonSize, Color } from '../../../shared/types';

const SIZES = {
  [BUTTON_SIZE.SMALL]: css`
    font-size: 0.875rem;
    padding: 8px 12px;
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

export interface Props {
  /** 버튼 안에 넣어줄 string 값 */
  children: string;
  /** 버튼 클릭했을 때 핸들러 */
  onClick: MouseEventHandler<HTMLButtonElement>;
  /** 버튼의 크기를 결정하는 요소 */
  size?: ButtonSize;
  /** 버튼 뒤의 배경 색상을 결정 */
  backgroundColor?: Color;
  /** 버튼 안 텍스트의 컬러 */
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
