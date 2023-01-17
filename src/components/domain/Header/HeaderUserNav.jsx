import { icAlertOn, icMyGroup, icMyInfo } from '@/assets/icons';
import Button from '@/components/base/Button';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HeaderUserNav = () => {
  const navigate = useNavigate();
  const isLogined = false;

  return (
    <StyledHeaderUserNav>
      {isLogined ? (
        <>
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
            bgcolor={COLOR.HEADER_TRANSPARENT_BG}>
            <img src={icMyInfo} />
          </Button>
          <Button
            style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
            bgcolor={COLOR.HEADER_TRANSPARENT_BG}
            onClick={() => navigate('/')}>
            로그아웃
          </Button>
        </>
      ) : (
        <Button
          style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
          bgcolor={COLOR.HEADER_TRANSPARENT_BG}
          onClick={() => navigate('/signIn')}>
          로그인
        </Button>
      )}
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
