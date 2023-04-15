import theme from '@/styles/theme';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Template = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;

  z-index: 1;
  position: fixed;
  top: 0;

  width: 100%;
  height: 7rem;
  background-color: transparent;
  box-shadow: none;

  ${({ isFontWhite }) =>
    isFontWhite &&
    css`
      & button,
      & i {
        color: ${theme.colors.white_900};
      }
    `};

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      background-color: ${theme.colors.white_900};
      box-shadow: 0 0.5rem 1.5rem ${theme.shadows[700]};

      & button,
      & div > i {
        color: ${theme.colors.black_900};
      }
    `};
`;

const rightSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const rightSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20rem);
  }
`;

export const MobileSearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  gap: 3rem;

  position: fixed;
  width: 100%;

  animation: ${({ isVisible }) => (!isVisible ? css`300ms ${rightSlideIn}` : css`200ms ${rightSlideOut}`)};
`;
