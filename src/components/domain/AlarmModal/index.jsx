import { getAlarms, updateSeenAlarm } from '@/api/alarm';

import { Heading, Icon, Text } from '@/components/base';
import SettingModal from '@/components/domain/SettingModal';

import useInput from '@/hooks/useInput';

import { convertDate } from '@/utils/date';

import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';
import {
  StyledAlarm,
  StyledAlarmContainer,
  StyledAlarmModal,
  StyledAvatar,
  StyledContent,
  StyledContentContainer,
  StyledHeaderContainer,
  StyledHeaderItem,
  StyledNoAlarm,
} from './styles';

function AlarmModal({ visible, onClose }) {
  const navigate = useNavigate();

  const [alarms, setAlarms] = useState([]);
  const [filteredAlarms, setFilteredAlarms] = useState(alarms);
  const clickedIndex = useInput(0);
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      setAlarms(await getAlarms());
    })();
  }, [visible]);

  const handleAlarmClick = (postId) => {
    navigate(`/TIL/${postId}`);
    onClose && onClose();
  };

  const handleUpdateSeenAlarm = async () => {
    if (alarms.every(({ seen }) => seen)) return;

    await updateSeenAlarm();
    setAlarms(await getAlarms());
  };

  useEffect(() => {
    switch (clickedIndex.value) {
      case 0:
        setFilteredAlarms(alarms);
        break;
      case 1:
        setFilteredAlarms(alarms.filter(({ seen }) => seen));
        break;
      case 2:
        setFilteredAlarms(alarms.filter(({ seen }) => !seen));
        break;
      default:
        setFilteredAlarms(alarms);
        break;
    }
  }, [alarms, clickedIndex.value]);

  return (
    <StyledAlarmModal visible={visible} onClose={onClose} isDimTransparent hasChild={settingModalVisible}>
      <StyledHeaderContainer>
        <StyledHeaderItem onClick={() => setSettingModalVisible(true)}>
          <Heading level={6}>알림</Heading>
          <Icon name='caret-down' size='medium' />
          {settingModalVisible && (
            <SettingModal
              visible={settingModalVisible}
              onClose={() => setSettingModalVisible(false)}
              clickedIndex={clickedIndex}
              onReadAll={handleUpdateSeenAlarm}
            />
          )}
        </StyledHeaderItem>
        <Icon size='medium' isPointer={true} onClick={() => onClose && onClose()} />
      </StyledHeaderContainer>
      <StyledAlarmContainer>
        {alarms.length === 0 || (filteredAlarms.length === 0 && clickedIndex.value !== 2) ? (
          <StyledNoAlarm>🥲 알림이 없어요...</StyledNoAlarm>
        ) : filteredAlarms.length === 0 ? (
          <StyledNoAlarm>🥲 읽지 않은 알림이 없어요...</StyledNoAlarm>
        ) : (
          filteredAlarms.map(({ _id, author, post, like, comment }) => (
            <StyledAlarm key={_id} onClick={() => handleAlarmClick(post)}>
              <StyledAvatar src={author.image} size='medium' />
              <StyledContentContainer>
                <StyledContent size='medium'>
                  {like
                    ? `${author.fullName}님이 ${like.post.title.title}을(를) 좋아합니다.`
                    : `${author.fullName}님이 ${comment.post.title.title}에 남긴 댓글: ${comment.comment}`}
                </StyledContent>
                <Text size='small' color={COLOR.CREATEDAT}>
                  {convertDate(new Date(like ? like.post.updatedAt : comment.post.updatedAt))}
                </Text>
              </StyledContentContainer>
            </StyledAlarm>
          ))
        )}
      </StyledAlarmContainer>
    </StyledAlarmModal>
  );
}

export default memo(AlarmModal);
