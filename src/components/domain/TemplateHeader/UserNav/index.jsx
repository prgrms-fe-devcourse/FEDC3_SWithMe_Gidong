import { Button } from '@/components/base';
import Authorized from '@/components/domain/TemplateHeader/UserNav/Authorized';
import { useNavigate } from 'react-router-dom';
import { StyledUserNav } from '../styles';
import { useRecoilValue } from 'recoil';
import { isAuthorizedState } from '@/stores/auth';

const UserNav = () => {
  const isAuthed = useRecoilValue(isAuthorizedState);
  const navigate = useNavigate();

  return (
    <StyledUserNav>
      {isAuthed ? (
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
