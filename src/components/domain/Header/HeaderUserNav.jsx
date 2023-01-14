import styled from '@emotion/styled';
import UserNavButton from './UserNavButton';
import UserSignInButton from './UserSignInButton';
import { icMyGroup, icAlertOn, icMyInfo } from '@/assets/icons';

const HeaderUserNav = () => {
  const isLogined = false;

  return (
    <StyledHeaderUserNav>
      {isLogined ? (
        <>
          <UserNavButton variant={icMyGroup} />
          <UserNavButton variant={icAlertOn} />
          <UserNavButton variant={icMyInfo} />
          <UserSignInButton variant={'로그아웃'} />
        </>
      ) : (
        <UserSignInButton variant={'로그인'} />
      )}
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
