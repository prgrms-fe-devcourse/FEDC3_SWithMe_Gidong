import { icLogo } from '@/assets/icons';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/base';

const HeaderLogo = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderLogo onClick={() => navigate('/')}>
      <img src={icLogo} alt='' />
      <Header strong level={1} size={24}>
        스윗미
      </Header>
    </StyledHeaderLogo>
  );
};

export default HeaderLogo;

const StyledHeaderLogo = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  height: 6.4rem;
  margin-left: 2rem;
  padding: 0;

  & > h1 {
    white-space: nowrap;
  }
`;
