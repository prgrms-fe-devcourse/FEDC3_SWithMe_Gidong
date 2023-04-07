import ToastItem from '@/components/base/Toast/ToastItem';

import useToasts from '@/hooks/useToasts';

import PropTypes from 'prop-types';

import { StyledToast } from './styles';

function Toast() {
  const { toasts } = useToasts();

  return (
    <StyledToast>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </StyledToast>
  );
}

Toast.propTypes = {
  toasts: PropTypes.array,
  removeToast: PropTypes.func,
};

export default Toast;
