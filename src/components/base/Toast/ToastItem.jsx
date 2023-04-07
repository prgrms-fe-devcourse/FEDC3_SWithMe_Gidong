import { Text } from '@/components/base';

import useTimeout from '@/hooks/useTimeout';
import useToasts from '@/hooks/useToasts';

import PropTypes from 'prop-types';

import { useState } from 'react';

import { StyledProgressBar, StyledToastItemContainer } from './styles';

function ToastItem({ id, message, duration }) {
  const [show, setShow] = useState(true);
  const { removeToast } = useToasts();

  useTimeout(() => {
    setShow(false);
    setTimeout(() => removeToast(id), 400);
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
  message: PropTypes.string,
  duration: PropTypes.number,
};

export default ToastItem;
