import { getAlarms } from '@/api/alarm';
import { postUserSignOut } from '@/api/userSign';
import { Badge, Button, Icon } from '@/components/base';
import AlarmModal from '@/components/domain/AlarmModal';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserNav = () => {
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn },
    onLogout,
  } = useAuthContext();

  const signOut = async () => {
    await postUserSignOut();
    onLogout();
    navigate('/');
  };

  const [alarmModalVisible, setAlarmModalVisible] = useState(false);

  if (!isLoggedIn) {
    return (
      <StyledHeaderUserNav>
        <Button
          style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
          bgcolor={COLOR.HEADER_TRANSPARENT_BG}
          onClick={() => navigate('/signIn')}>
          로그인
        </Button>
      </StyledHeaderUserNav>
    );
  }

  // TODO: alarm 데이터 최신으로 관리 -> react query or swr
  const [hasUnseenAlarm, setHasUnseenAlarm] = useState(false);
  useEffect(() => {
    (async () => {
      setHasUnseenAlarm((await getAlarms()).some(({ seen }) => !seen));
    })();
  }, [alarmModalVisible]);

  return (
    <StyledHeaderUserNav>
      {alarmModalVisible && <AlarmModal visible={alarmModalVisible} onClose={() => setAlarmModalVisible(false)} />}
      <Icon name='users' size={2} onClick={() => navigate('/myGroup')} style={{ cursor: 'pointer' }} />
      <Badge dot={hasUnseenAlarm}>
        <Icon name='bell' size={2} onClick={() => setAlarmModalVisible(true)} style={{ cursor: 'pointer' }} />
      </Badge>
      <Icon name='user' size={2} onClick={() => navigate('/myPage')} style={{ cursor: 'pointer' }} />
      <Button
        style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => signOut()}>
        로그아웃
      </Button>
    </StyledHeaderUserNav>
  );
};

export default UserNav;

const StyledHeaderUserNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2rem;
  gap: 2rem;

  position: relative;

  & button:hover {
    color: ${COLOR.GRAY3};
  }
`;
