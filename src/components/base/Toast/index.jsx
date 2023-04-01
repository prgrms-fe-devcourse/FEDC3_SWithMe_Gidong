import ToastItem from '@/components/base/Toast/ToastItem';
import PropTypes from 'prop-types';
import { StyledToast } from './styles';

function Toast({ toasts, removeToast }) {
  return (
    <StyledToast>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDone={() => removeToast(toast.id)} />
      ))}
    </StyledToast>
  );
}

Toast.propTypes = {
  toasts: PropTypes.array,
  removeToast: PropTypes.func,
};

export default Toast;
