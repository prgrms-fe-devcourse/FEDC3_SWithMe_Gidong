import { Text } from '@/components/base';
import useTimeout from '@/hooks/useTimeout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledProgressBar, StyledToastItemContainer } from './styles';

function ToastItem({ id, message, duration, onDone }) {
  const [show, setShow] = useState(true);

  useTimeout(() => {
    setShow(false);
    setTimeout(() => onDone(), 400);
  }, duration);

  return (
    <StyledToastItemContainer style={{ opacity: show ? 1 : 0 }}>
      <StyledProgressBar style={{ animationDuration: `${duration}ms` }} />
      <Text size='medium'>{message}</Text>
    </StyledToastItemContainer>
  );
}

ToastItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropType.string,
  duration: propTypes.number,
  onDone: PropTypes.func,
};

export default ToastItem;
