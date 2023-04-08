import { setItem, removeItem } from '@/utils/storage';
import { useSetRecoilState } from 'recoil';
import { isAuthorizedState } from '@/stores/auth';
import { userState } from '@/stores/user';

const useAuth = () => {
  const setIsAuthorized = useSetRecoilState(isAuthorizedState);
  const setLoggedUser = useSetRecoilState(userState);

  const onLogin = ({ user, token }) => {
    setItem('token', token);
    setIsAuthorized(true);
    setLoggedUser(user);
  };

  const onLogout = () => {
    removeItem('token');
    setIsAuthorized(false);
    setLoggedUser({});
  };

  const onReload = (user) => {
    setLoggedUser(user);
  };

  return { onLogin, onLogout, onReload };
};

export default useAuth;
