import styled from '@emotion/styled';
import ToastItem from '@/components/base/Toast/ToastItem';

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

const StyledToast = styled.div`
  z-index: 10000;
  position: fixed;
  bottom: 2rem;
  right: 2rem;

  width: 30rem;
  @media (max-width: 624px) {
    width: 80%;
  }

  display: flex;
  flex-direction: column-reverse;
`;
