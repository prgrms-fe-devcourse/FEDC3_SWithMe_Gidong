import useClickAway from '@/hooks/useClickAway';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

function Modal({
  children,
  width,
  height,
  visible = false,
  round = true,
  dimColor = 'rgba(0, 0, 0, 0.5)',
  onClose,
  hasChild,
  ...props
}) {
  const ref = useClickAway(() => {
    onClose && !hasChild && onClose();
  });
  const containerStyle = useMemo(() => ({ width, height }), [width, height]);

  const handleEscKey = useCallback(
    (e) => {
      if (e.key !== 'Escape') {
        return;
      }
      onClose();
    },
    [onClose],
  );

  const modal = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    if (!hasChild) document.addEventListener('keyup', handleEscKey, false);

    return () => {
      document.body.removeChild(modal);
      document.body.style.overflow = 'unset';
      if (!hasChild) document.removeEventListener('keyup', handleEscKey, false);
    };
  }, [hasChild]);

  return ReactDOM.createPortal(
    <StyledBackgroundDim style={{ display: visible ? 'block' : 'none' }} dimColor={dimColor}>
      <StyledModalContainer ref={ref} round={round} {...props} style={{ ...containerStyle, ...props.style }}>
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
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  border-radius: ${({ round }) => (round ? '1rem' : 'none')};
`;
