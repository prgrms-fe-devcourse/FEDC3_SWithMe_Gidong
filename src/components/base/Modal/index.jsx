import useClickAway from '@/hooks/useClickAway';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { StyledBackgroundDim, StyledModalContainer } from './styles';

function Modal({
  children,
  width,
  height,
  visible = false,
  round = true,
  onClose,
  hasChild,
  isDimTransparent = false,
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
    <StyledBackgroundDim style={{ display: visible ? 'block' : 'none' }} isDimTransparent={isDimTransparent}>
      <StyledModalContainer ref={ref} round={round} {...props} style={{ ...containerStyle, ...props.style }}>
        {children}
      </StyledModalContainer>
    </StyledBackgroundDim>,
    modal,
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  width: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  visible: PropTypes.bool,
  round: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  hasChild: PropTypes.bool,
  isDimTransparent: PropTypes.bool,
};

export default Modal;
