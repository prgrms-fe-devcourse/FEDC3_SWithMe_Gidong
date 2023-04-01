import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Template = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  top: 0;

  z-index: 1;
  position: fixed;

  width: 100%;
  height: 7rem;
  background-color: transparent;
  box-shadow: none;

  ${({ isFontWhite }) =>
    isFontWhite &&
    css`
      & button,
      & i {
        color: ${COLOR.WHITE};
      }
    `};

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      background-color: ${COLOR.WHITE};
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);

      & button,
      & i {
        color: black;
      }
    `};
`;

export { Template, HeaderContainer };
