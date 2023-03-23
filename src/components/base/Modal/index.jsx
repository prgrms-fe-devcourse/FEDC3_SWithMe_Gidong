import useClickAway from '@/hooks/useClickAway';
import { useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { StyledBackgroundDim, StyledModalContainer } from './styles';

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
