import { useEffect } from 'react';
import { getItem, setItem, removeItem } from '@/utils/storage';
import { useAuthState, useResetAuthState } from '@/stores/auth';
import { useUserState, useResetUserState } from '@/stores/user';

const useLogin = () => {
  const [isAuthed, setIsAuthed] = useAuthState();
  const [loggedUser, setLoggedUser] = useUserState();

  const resetAuth = useResetAuthState();
  const resetLoggedUser = useResetUserState();

  const onLogin = ({ user, token }) => {
    setItem('user', user);
    setItem('token', token);
    setIsAuthed(true);
    setLoggedUser(user);
  };

  const onLogout = () => {
    removeItem('user');
    removeItem('token');
    resetAuth();
    resetLoggedUser();
  };

  const onReload = (user) => {
    setItem('user', user);
    setLoggedUser(user);
  };

  useEffect(() => {
    setIsAuthed(!!getItem('token'));
  }, [loggedUser]);

  useEffect(() => {
    setLoggedUser(getItem('user', {}));
  }, [isAuthed]);

  return { onLogin, onLogout, onReload };
};

export default useLogin;
