import { createContext, useState, useContext } from 'react';
import { setItem, getItem, removeItem } from '@/utils/storage';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: getItem('token') ? true : false,
    loggedUser: getItem('user'),
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
  };

  const onLogout = () => {
    removeItem('user');
    removeItem('token');
    setAuthState({
      isLoggedIn: false,
      loggedUser: {},
      userToken: '',
    });
  };

  return <AuthContext.Provider value={{ authState, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
