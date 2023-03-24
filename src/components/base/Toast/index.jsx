import ToastItem from '@/components/base/Toast/ToastItem';
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

export default Toast;
