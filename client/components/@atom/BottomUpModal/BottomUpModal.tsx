import { MouseEventHandler, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const BottomUpModal = ({ children, onClose, isOpen }: Props) => {
  if (typeof window === 'undefined') return null;

  const $rootPortal = document.getElementById('root-portal');

  if (!$rootPortal) return null;

  const onClickDimmed: MouseEventHandler<HTMLDivElement> = (event): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return isOpen
    ? createPortal(
        <ModalDimmed onClick={onClickDimmed}>
          <ModalContainer>{children}</ModalContainer>
        </ModalDimmed>,
        $rootPortal,
      )
    : null;
};

const ModalDimmed = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: fixed;

  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);

  border-radius: 15px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 220px;

  border-radius: 5px 5px 15px 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  background: #fff;

  animation: bottomUp 0.8s ease;

  @keyframes bottomUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export default BottomUpModal;
