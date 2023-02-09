import { icLogo } from '@/assets/icons';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/base';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <StyledHeaderLogo onClick={() => navigate('/')}>
        <img src={icLogo} alt='' />
        <Header strong level={1} size={24}>
          스윗미
        </Header>
      </StyledHeaderLogo>
    </div>
  );
};

export default Logo;

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
