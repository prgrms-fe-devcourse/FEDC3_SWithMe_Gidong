import Authorized from '@/components/domain/TemplateHeader/UserNav/Authorized';
import NotAuthorized from '@/components/domain/TemplateHeader/UserNav/NotAuthorized';
import { useAuthContext } from '@/context/AuthProvider';
import { StyledUserNav } from '../styles';

const UserNav = () => {
  const {
    authState: { isLoggedIn },
  } = useAuthContext();

  return <StyledUserNav>{isLoggedIn ? <Authorized /> : <NotAuthorized />}</StyledUserNav>;
};

export default UserNav;
