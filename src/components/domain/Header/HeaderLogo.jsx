import styled from '@emotion/styled';
import Logo from './Logo';
import logoSrc from '@/assets/images/swm_logo01.png';

const HeaderLogo = () => {
  return (
    <StyledHeaderLogo>
      <Logo src={logoSrc} />
    </StyledHeaderLogo>
  );
};

export default HeaderLogo;

const StyledHeaderLogo = styled.div`
  display: flex;
  width: 15rem;
  height: 6.4rem;
  margin: 0.8rem 0 0.8rem 2.6rem;
`;
