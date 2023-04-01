import { useAlarms } from '@/api/alarm';
import { postUserSignOut } from '@/api/userSign';
import { Badge, Button, Icon } from '@/components/base';
import AlarmModal from '@/components/domain/AlarmModal';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorized = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuthContext();

  const signOut = async () => {
    await postUserSignOut();
    onLogout();
    navigate('/');
  };

  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const { data, isLoading, error } = useAlarms();

  return (
    <>
      {alarmModalVisible && <AlarmModal visible={alarmModalVisible} onClose={() => setAlarmModalVisible(false)} />}
      <Icon name='users' size='medium' isPointer={true} onClick={() => navigate('/myGroup')} />
      <Badge dot={!isLoading && data && data.length > 0 && data.some(({ seen }) => !seen)} bgColor={COLOR.ALARM_GREEN}>
        <Icon name='bell' size='medium' isPointer={true} onClick={() => setAlarmModalVisible(true)} />
      </Badge>
      <Icon name='user' size='medium' isPointer={true} onClick={() => navigate('/myPage')} />
      <Button
        style={{ width: '7.7rem', height: '2.1rem', margin: '0.7rem 0', padding: '0', fontSize: '1.8rem' }}
        bgcolor={COLOR.HEADER_TRANSPARENT_BG}
        onClick={() => signOut()}>
        로그아웃
      </Button>
    </>
  );
};

export default Authorized;
