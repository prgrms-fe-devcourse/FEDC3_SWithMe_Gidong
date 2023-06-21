import styled from '@emotion/styled';

export const Toast = styled.div`
  z-index: 10000;
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  width: 30rem;
  @media (max-width: 624px) {
    width: 80%;
  }

  display: flex;
  flex-direction: column-reverse;
`;

export const ToastItemContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 7rem;
  padding: 0 2rem;
  align-items: center;
  background-color: white;
  box-shadow: 0 1rem 2rem ${({ theme }) => theme.shadows[700]};
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.4s ease-out;

  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }

  &:not(:first-of-type) {
    margin-bottom: 0.8rem;
  }

  @keyframes move {
    0% {
      margin-top: 8rem;
    }
    100% {
      margin-top: 0;
    }
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.6rem;
  background-color: ${({ theme }) => theme.colors.main_700};

  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
