import { useEffect, useRef } from 'react';

const EVENTS = ['mousedown', 'touchstart'];

const useClickAway = (handler) => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e) => {
      !element.contains(e.target) && savedHandler.current(e);
    };

    EVENTS.forEach((event) => {
      document.addEventListener(event, handleEvent);
    });

    return () => {
      EVENTS.forEach((event) => {
        document.removeEventListener(event, handleEvent);
      });
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
