import { Text } from '@/components/base';
import useTimeout from '@/hooks/useTimeout';
import { useState } from 'react';
import { StyledToastItemContainer, StyledProgressBar } from './styles';

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

export default ToastItem;
