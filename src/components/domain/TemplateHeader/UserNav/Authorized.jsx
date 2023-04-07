import { postUserSignOut } from '@/api/userSign';

import { Badge, Button, Icon } from '@/components/base';
import AlarmModal from '@/components/domain/AlarmModal';

import { useAuthContext } from '@/context/AuthProvider';

import { useGetNotifications } from '@/hooks/queries/notifications';

import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';

const Authorized = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuthContext();

  const signOut = async () => {
    await postUserSignOut();
    onLogout();
    navigate('/');
  };

  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const { data: alarms, isLoading } = useGetNotifications();

  return (
    <>
      {alarmModalVisible && <AlarmModal visible={alarmModalVisible} onClose={() => setAlarmModalVisible(false)} />}
      <Icon name='users' size='medium' isPointer={true} onClick={() => navigate('/myGroup')} />
      <Badge dot={!isLoading && alarms.length > 0 && alarms.some(({ seen }) => !seen)} bgColor={COLOR.ALARM_GREEN}>
        <Icon name='bell' size='medium' isPointer={true} onClick={() => setAlarmModalVisible(true)} />
      </Badge>
      <Icon name='user' size='medium' isPointer={true} onClick={() => navigate('/myPage')} />
      <Button fontSize='large' version='transparent' onClick={() => signOut()}>
        로그아웃
      </Button>
    </>
  );
};

export default memo(Authorized);
