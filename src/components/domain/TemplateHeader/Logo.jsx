import { icLogo } from '@/assets/icons';
import { Heading } from '@/components/base';
import { useNavigate } from 'react-router-dom';
import { StyledHeaderLogo } from './styles';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <StyledHeaderLogo onClick={() => navigate('/')}>
        <img src={icLogo} alt='' />
        <Heading level={5}>스윗미</Heading>
      </StyledHeaderLogo>
    </div>
  );
};

export default Logo;
