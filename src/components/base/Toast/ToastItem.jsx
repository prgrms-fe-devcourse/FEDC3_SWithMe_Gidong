import { Text } from '@/components/base';
import useTimeout from '@/hooks/useTimeout';
import { useState } from 'react';
import { ToastContainer, ToastProgressBar } from './styles';

function ToastItem({ id, message, duration, onDone }) {
  const [show, setShow] = useState(true);

  useTimeout(() => {
    setShow(false);
    setTimeout(() => onDone(), 400);
  }, duration);

  return (
    <ToastContainer style={{ opacity: show ? 1 : 0 }}>
      <ToastProgressBar style={{ animationDuration: `${duration}ms` }} />
      <Text size={1.6}>{message}</Text>
    </ToastContainer>
  );
}

export default ToastItem;
