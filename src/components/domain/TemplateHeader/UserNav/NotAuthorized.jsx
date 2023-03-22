import { Button } from '@/components/base';
import { COLOR } from '@/styles/color';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Button
      style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
      bgcolor={COLOR.HEADER_TRANSPARENT_BG}
      onClick={() => navigate('/signIn')}>
      로그인
    </Button>
  );
};

export default NotAuthorized;
