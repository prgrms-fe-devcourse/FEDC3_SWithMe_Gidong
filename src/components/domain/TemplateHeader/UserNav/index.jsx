import { Button } from '@/components/base';
import Authorized from '@/components/domain/TemplateHeader/UserNav/Authorized';
import { useAuthContext } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { StyledUserNav } from '../styles';

const UserNav = () => {
  const {
    authState: { isLoggedIn },
  } = useAuthContext();
  const navigate = useNavigate();

  return (
    <StyledUserNav>
      {isLoggedIn ? (
        <Authorized />
      ) : (
        <Button fontSize='large' version='transparent' onClick={() => navigate('/signIn')}>
          로그인
        </Button>
      )}
    </StyledUserNav>
  );
};

export default UserNav;
