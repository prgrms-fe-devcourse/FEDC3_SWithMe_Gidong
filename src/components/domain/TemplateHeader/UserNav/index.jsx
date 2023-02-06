import Authorized from '@/components/domain/TemplateHeader/UserNav/Authorized';
import NotAuthorized from '@/components/domain/TemplateHeader/UserNav/NotAuthorized';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const UserNav = () => {
  const {
    authState: { isLoggedIn },
  } = useAuthContext();

  return <StyledUserNav>{isLoggedIn ? <Authorized /> : <NotAuthorized />}</StyledUserNav>;
};

export default UserNav;

const StyledUserNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2rem;
  gap: 2rem;

  position: relative;

  & button:hover {
    color: ${COLOR.GRAY3};
  }
`;
