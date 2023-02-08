import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Toast } from '@/components/base';
import { useEffect } from 'react';
import { v4 } from 'uuid';

const ToastContext = createContext();
export const useToastContext = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

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

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toast toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
