import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import useClickAway from '@/hooks/useClickAway';

function Modal({ children, width = 500, height, visible = false, round = true, onClose, ...props }) {
  const ref = useClickAway(() => {
    onClose && onClose();
  });
  const containerStyle = useMemo(() => ({ width, height }), [width, height]);

  const modal = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(modal);
    return () => {
      document.body.removeChild(modal);
    };
  });
  return ReactDOM.createPortal(
    <StyledBackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <StyledModalContainer ref={ref} round={round} {...props} style={{ ...props.style, ...containerStyle }}>
        {children}
      </StyledModalContainer>
    </StyledBackgroundDim>,
    modal,
  );
}

export default Modal;

const StyledBackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StyledModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  border-radius: ${({ round }) => (round ? '1rem' : 'none')};
`;
