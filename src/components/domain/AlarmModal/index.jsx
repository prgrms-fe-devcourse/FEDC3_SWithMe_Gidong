import { getAlarms, updateSeenAlarm } from '@/api/alarm';
import { Avatar, Header, Icon, Modal, Text } from '@/components/base';
import SettingModal from '@/components/domain/SettingModal';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AlarmModal({ visible, onClose }) {
  const navigate = useNavigate();

  const [alarms, setAlarms] = useState([]);
  const [filteredAlarms, setFilteredAlarms] = useState(alarms);
  const clickedIndex = useInput(0);
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      setAlarms(await getOrderedAlarms());
    })();
  }, [visible]);

  const getOrderedAlarms = async () => {
    return (await getAlarms()).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  const handleAlarmClick = (postId) => {
    navigate(`/TIL/${postId}`);
    onClose && onClose();
  };

  const handleUpdateSeenAlarm = async () => {
    if (alarms.every(({ seen }) => seen)) return;

    await updateSeenAlarm();
    setAlarms(await getOrderedAlarms());
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
    <StyledAlarmModal visible={visible} onClose={onClose} dimColor='transparent' hasChild={settingModalVisible}>
      <StyledHeaderContainer>
        <StyledHeaderItem onClick={() => setSettingModalVisible(true)}>
          <Header level={2} strong={+true} size='2rem'>
            알림
          </Header>
          <Icon name='caret-down' size={2} />
          {settingModalVisible && (
            <SettingModal
              visible={settingModalVisible}
              onClose={() => setSettingModalVisible(false)}
              clickedIndex={clickedIndex}
              onReadAll={handleUpdateSeenAlarm}
            />
          )}
        </StyledHeaderItem>
        <Icon size={2} style={{ cursor: 'pointer' }} onClick={() => onClose && onClose()} />
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
                <StyledContent size={1.6}>
                  {like
                    ? `${author.fullName}님이 ${like.post.title.title}을(를) 좋아합니다.`
                    : `${author.fullName}님이 ${comment.post.title.title}에 남긴 댓글: ${comment.comment}`}
                </StyledContent>
                <Text size={1.2} color={COLOR.CREATEDAT}>
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

export default AlarmModal;

const StyledAlarmModal = styled(Modal)`
  padding: 0;
  position: absolute;
  top: 7rem;
  right: 14rem;
  transform: none;

  width: 40rem;
  height: 45rem;
  max-width: 40rem;
  max-height: 45rem;

  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;

  @media (max-width: 624px) {
    position: fixed;
    top: 0;
    right: 0;

    max-width: 100%;
    width: 100%;
    border-top-right-radius: 0;
    border-top-left-radius: 0;

    & > :nth-of-type(1) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 4.8rem;
  padding: 0 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: white;

  background-color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const StyledHeaderItem = styled.div`
  display: flex;
  gap: 0.6rem;
  cursor: pointer;

  position: relative;
`;

const StyledAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  flex-grow: 1;
`;

const StyledAlarm = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1.6rem 1.6rem 1.6rem 0;

  &:hover {
    background-color: ${COLOR.TEXTAREA_BG};
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-right: 1rem;
`;

const StyledContent = styled(Text)`
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 6rem;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const StyledAvatar = styled(Avatar)`
  align-self: flex-start;
  margin: 0 1.6rem;
`;

const StyledNoAlarm = styled(Text)`
  padding: 0 1rem;
  font-size: 2rem;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
