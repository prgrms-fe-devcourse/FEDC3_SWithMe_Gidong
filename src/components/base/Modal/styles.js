import styled from '@emotion/styled';

export const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ isDimTransparent }) => (isDimTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)')};
  z-index: 2000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white_900};
  box-shadow: 0 1rem 2rem ${({ theme }) => theme.shadows[700]};
  box-sizing: border-box;

  border-radius: ${({ round }) => (round ? '1rem' : 'none')};
`;
