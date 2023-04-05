import { useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from '@/utils/storage';
import { useToken, useResetToken } from '@/stores/auth';

const useAuth = () => {
  const [token, setToken] = useToken();
  const resetToken = useResetToken();
  const [authState, setAuthState] = useState({
    isLoggedIn: getItem('token') ? true : false,
    loggedUser: getItem('user', {}),
    userToken: getItem('token'),
  });

  const onLogin = ({ user, token }) => {
    setItem('user', user);
    setItem('token', token);
    setAuthState({
      isLoggedIn: true,
      loggedUser: user,
      userToken: token,
    });
    setToken(token);
  };

  const onLogout = () => {
    removeItem('user');
    removeItem('token');
    setAuthState({
      isLoggedIn: false,
      loggedUser: {},
      userToken: '',
    });
    resetToken();
  };

  const onReload = (user) => {
    setItem('user', user);
    setAuthState({
      ...authState,
      loggedUser: user,
    });
  };

  useEffect(() => {
    setAuthState({
      ...authState,
      isLoggedIn: !!token,
    });
  }, [token]);

  return { authState, onLogin, onLogout, onReload };
};

export default useAuth;
