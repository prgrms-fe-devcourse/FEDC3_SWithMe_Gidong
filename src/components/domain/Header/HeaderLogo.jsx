import { imgLogo } from '@/assets/images';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HeaderLogo = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderLogo onClick={() => navigate('/')}>
      <Logo src={imgLogo} />
    </StyledHeaderLogo>
  );
};

export default HeaderLogo;

const StyledHeaderLogo = styled.button`
  display: flex;
  width: 15rem;
  height: 6.4rem;
  margin: 0.8rem 0 0.8rem 2.6rem;
  padding: 0;
`;

const Logo = styled.img`
  width: 15rem;
  height: 6.4rem;
`;
