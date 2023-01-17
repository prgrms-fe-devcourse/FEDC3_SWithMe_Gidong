import { icAlertOn, icMyGroup, icMyInfo } from '@/assets/icons';
import Button from '@/components/base/Button';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postUserSignOut } from '@/api/userSign';
import { getItem } from '@/utils/storage';

const HeaderUserNav = () => {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);

  const signOut = async () => {
    await postUserSignOut();
    setIsLogined(false);
    navigate('/');
  };

  const refreshUserState = () => {
    if (getItem('token')) {
      return setIsLogined(true);
    }

    return setIsLogined(false);
  };

  useEffect(() => {
    refreshUserState();
  }, [getItem('token')]);

  if (!isLogined) {
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
  width: 21.3rem;
  height: 3.5rem;
  margin: 2.2rem 5rem 2.2rem 0;
`;
