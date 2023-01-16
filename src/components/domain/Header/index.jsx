import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import HeaderLogo from './HeaderLogo';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderUserNav from './HeaderUserNav';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <HeaderLogo />
      <HeaderSearchBar />
      <HeaderUserNav />
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledHeaderContainer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  z-index: 1;
  justify-content: space-between;
  width: 100%;
  height: 8rem;
  background: linear-gradient(to right, ${COLOR.HEADER_BG_GRADIENT_LEFT}, ${COLOR.HEADER_BG_GRADIENT_RIGHT});
`;
