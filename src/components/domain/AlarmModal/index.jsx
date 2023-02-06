import { getAlarms, updateSeenAlarm } from '@/api/alarm';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Header, Icon, Modal, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FILTER_METHODS = ['전체', '읽은 알림', '안읽은 알림'];

function AlarmModal({ visible, onClose }) {
  const navigate = useNavigate();

  const [alarms, setAlarms] = useState([]);
  const [filteredAlarms, setFilteredAlarms] = useState(alarms);
  const [clickedIndex, setClickedIndex] = useState(0);

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
    switch (clickedIndex) {
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
  }, [alarms, clickedIndex]);

  return (
    <StyledAlarmModal visible={visible} onClose={onClose} dimColor='transparent'>
      {visible && (
        <>
          <StyledHeaderContainer>
            <StyledHeaderItem>
              <Header level={2} strong={+true} size='2rem'>
                알림
              </Header>
              <StyledButton as='span' onClick={handleUpdateSeenAlarm}>
                전체 읽기
              </StyledButton>
            </StyledHeaderItem>
            <Icon size={2} style={{ cursor: 'pointer' }} onClick={() => onClose && onClose()} />
          </StyledHeaderContainer>
          <StyledFilterTabContainer>
            {FILTER_METHODS.map((method, i) => (
              <StyledFilterTab key={method} onClick={() => setClickedIndex(i)} isClicked={clickedIndex === i}>
                {method}
              </StyledFilterTab>
            ))}
          </StyledFilterTabContainer>
          <StyledAlarmContainer>
            {alarms.length === 0 || (filteredAlarms.length === 0 && clickedIndex !== 2) ? (
              <StyledNoAlarm>🥲 알림이 없어요...</StyledNoAlarm>
            ) : filteredAlarms.length === 0 ? (
              <StyledNoAlarm>🥲 읽지 않은 알림이 없어요...</StyledNoAlarm>
            ) : (
              filteredAlarms.map(({ _id, author, post, like, comment }) => (
                <StyledAlarm key={_id} onClick={() => handleAlarmClick(post)}>
                  <StyledAvatar src={author.image || imgDefaultAvatar} size={4} />
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
        </>
      )}
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
  align-items: flex-end;
  gap: 2rem;
`;

const StyledFilterTabContainer = styled.div`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  min-height: 4rem;
`;

const StyledFilterTab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 calc(100% / 3);

  ${({ isClicked }) =>
    isClicked &&
    css`
      background-color: ${COLOR.C};
      color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
      font-weight: 700;
    `};

  &:hover {
    background-color: ${COLOR.MY_GROUP_BOX_BG};
    color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
  }
  &:not(:nth-last-of-type(1)) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const StyledButton = styled(Button)`
  background-color: transparent;
  font-size: 1.4rem;
  color: white;
  text-decoration: underline;
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
