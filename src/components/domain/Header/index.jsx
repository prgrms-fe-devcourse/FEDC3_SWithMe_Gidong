import styled from '@emotion/styled';
import { COLOR } from '../../../styles/colors';
import HeaderLogo from './HeaderLogo';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderUserNav from './HeaderUserNav';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderLogo />
      <HeaderSearchBar />
      <HeaderUserNav />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 8rem;
  background: linear-gradient(to right, ${COLOR.HEADER_BG_GRADIENT_LEFT}, ${COLOR.HEADER_BG_GRADIENT_RIGHT});
`;
