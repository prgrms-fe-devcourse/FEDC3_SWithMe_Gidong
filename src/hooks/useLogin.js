import { setItem, removeItem } from '@/utils/storage';
import { useAuthState, useResetAuthState } from '@/stores/auth';
import { useUserState, useResetUserState } from '@/stores/user';

const useLogin = () => {
  const [isAuthed, setIsAuthed] = useAuthState();
  const [loggedUser, setLoggedUser] = useUserState();

  const resetAuth = useResetAuthState();
  const resetLoggedUser = useResetUserState();

  const onLogin = ({ user, token }) => {
    setItem('token', token);
    setIsAuthed(true);
    setLoggedUser(user);
  };

  const onLogout = () => {
    removeItem('token');
    resetAuth();
    resetLoggedUser();
  };

  const onReload = (user) => {
    setLoggedUser(user);
  };

  return { onLogin, onLogout, onReload };
};

export default useLogin;
