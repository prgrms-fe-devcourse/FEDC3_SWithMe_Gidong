import { icLogo } from '@/assets/icons';
import { Header } from '@/components/base';
import { useNavigate } from 'react-router-dom';
import { StyledHeaderLogo } from './styles';

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
