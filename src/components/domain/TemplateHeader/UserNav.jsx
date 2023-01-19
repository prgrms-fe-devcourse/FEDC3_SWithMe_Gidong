import { postUserSignOut } from '@/api/userSign';
import { Button } from '@/components/base';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { NavIcon } from '@/components/domain/TemplateHeader';

const UserNav = () => {
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn },
    onLogout,
  } = useAuthContext();

  const signOut = async () => {
    await postUserSignOut();
    onLogout();
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <StyledHeaderUserNav>
        <Button
          style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
          bgcolor={COLOR.HEADER_TRANSPARENT_BG}
          onClick={() => navigate('/signIn')}>
          로그인
        </Button>
      </StyledHeaderUserNav>
    );
  }

  return (
    <StyledHeaderUserNav>
      <NavIcon onClick={() => navigate('/myGroup')} icon='users' />
      <NavIcon icon='bell' />
      <NavIcon onClick={() => navigate('/myPage')} icon='user' />
      <Button
        style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => signOut()}>
        로그아웃
      </Button>
    </StyledHeaderUserNav>
  );
};

export default UserNav;

const StyledHeaderUserNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2rem;

  & button:hover {
    color: ${COLOR.GRAY3};
  }
`;