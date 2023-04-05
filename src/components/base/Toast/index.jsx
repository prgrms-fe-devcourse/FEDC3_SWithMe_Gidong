import ToastItem from '@/components/base/Toast/ToastItem';
import PropTypes from 'prop-types';
import * as S from './styles';

function Toast({ toasts, removeToast }) {
  return (
    <S.Toast>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDone={() => removeToast(toast.id)} />
      ))}
    </S.Toast>
  );
}

Toast.propTypes = {
  toasts: PropTypes.array,
  removeToast: PropTypes.func,
};

export default Toast;
