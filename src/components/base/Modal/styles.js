import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ dimColor }) => dimColor};
  z-index: 2000;
`;

const StyledModalContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  padding: 1rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0 1rem 2rem ${COLOR.MODAL_BOX_SHADOW};
  box-sizing: border-box;

  border-radius: ${({ round }) => (round ? '1rem' : 'none')};
`;

export { StyledBackgroundDim, StyledModalContainer };
