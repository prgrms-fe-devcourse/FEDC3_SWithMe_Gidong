import styled from '@emotion/styled';
import { imgLogo } from '@/assets/images';

const HeaderLogo = () => {
  return (
    <StyledHeaderLogo>
      <Logo src={imgLogo} />
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

const Logo = styled.img`
  width: 15rem;
  height: 6.4rem;
`;
