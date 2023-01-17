import { icAlertOn, icMyGroup, icMyInfo } from '@/assets/icons';
import Button from '@/components/base/Button';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { postUserSignOut } from '@/api/userSign';
import { useAuthContext } from '@/context/AuthProvider';

const HeaderUserNav = () => {
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
      <Button
        style={{ width: '3.5rem', height: '3.5rem', marginRight: '1rem', padding: '0' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => navigate('/myGroup')}>
        <img src={icMyGroup} />
      </Button>
      <Button
        style={{ width: '3.5rem', height: '3.5rem', marginRight: '1rem', padding: '0' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}>
        <img src={icAlertOn} />
      </Button>
      <Button
        style={{ width: '3.5rem', height: '3.5rem', marginRight: '1rem', padding: '0' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => navigate('/myPage')}>
        <img src={icMyInfo} />
      </Button>
      <Button
        style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => signOut()}>
        로그아웃
      </Button>
    </StyledHeaderUserNav>
  );
};

export default HeaderUserNav;

const StyledHeaderUserNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2rem;
`;
