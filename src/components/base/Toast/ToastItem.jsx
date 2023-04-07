import { Text } from '@/components/base';
import useTimeout from '@/hooks/useTimeout';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as S from './styles';

function ToastItem({ id, message, duration, onDone }) {
  const [show, setShow] = useState(true);

  useTimeout(() => {
    setShow(false);
    setTimeout(() => onDone(), 400);
  }, duration);

  return (
    <S.ToastItemContainer style={{ opacity: show ? 1 : 0 }}>
      <S.ProgressBar style={{ animationDuration: `${duration}ms` }} />
      <Text size='medium'>{message}</Text>
    </S.ToastItemContainer>
  );
}

ToastItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.string,
  duration: PropTypes.number,
  onDone: PropTypes.func,
};

export default ToastItem;
