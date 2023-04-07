import { toastsState } from '@/stores/toasts';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { v4 } from 'uuid';

const useToasts = () => {
  const [toasts, setToasts] = useRecoilState(toastsState);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => setToasts((toasts) => toasts.slice(1)), 3000);

    return () => clearTimeout(timer);
  }, [toasts]);

  const addToast = useCallback(
    (message, duration = 3000) => setToasts((oldToasts) => [...oldToasts, { message, duration, id: v4() }]),
    [setToasts],
  );

  const removeToast = useCallback((id) => setToasts((oldToasts) => [...oldToasts.filter((toast) => toast.id !== id)]));

  return { toasts, addToast, removeToast };
};

export default useToasts;
