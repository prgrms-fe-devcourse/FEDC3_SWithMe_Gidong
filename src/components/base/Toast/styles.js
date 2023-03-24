import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledToast = styled.div`
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

const StyledToastItemContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 7rem;
  padding: 0 2rem;
  align-items: center;
  background-color: white;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
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

const StyledProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.6rem;
  background-color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};

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

export { StyledToast, StyledToastItemContainer, StyledProgressBar };
