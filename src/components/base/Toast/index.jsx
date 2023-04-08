import ToastItem from '@/components/base/Toast/ToastItem';

import useToasts from '@/hooks/useToasts';

import PropTypes from 'prop-types';
import * as S from './styles';

function Toast() {
  const { toasts } = useToasts();

  return (
    <S.Toast>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </S.Toast>
  );
}

Toast.propTypes = {
  toasts: PropTypes.array,
  removeToast: PropTypes.func,
};

export default Toast;
