import { getAlarms } from '@/api/alarm';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Header, Text } from '@/components/base';
import useClickAway from '@/hooks/useClickAway';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AlarmModal({ visible, onClose }) {
  const navigate = useNavigate();
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      const alarms = await getAlarms();
      alarms?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      setAlarms(alarms);
    })();
  }, [visible]);

  const handleAlarmClick = (postId) => {
    navigate(`/TIL/${postId}`);
    onClose && onClose();
  };

  return (
    <StyledModalWrapper visible={visible}>
      <StyledModalContainer ref={ref}>
        <StyledHeader level={1} strong={+true} size='2rem'>
          알림
        </StyledHeader>
        <StyledAlarmContainer>
          {alarms && alarms.length !== 0 ? (
            alarms.map((alarm) => (
              <StyledAlarm key={alarm._id} onClick={() => handleAlarmClick(alarm.post)}>
                <StyledAvatar src={alarm.author.image || imgDefaultAvatar} size={4} />
                <StyledContentContainer>
                  <StyledContent size={1.6} color={'black'}>
                    {alarm.like
                      ? `${alarm.author.fullName}님이 ${alarm.like.post.title.title}에 공감을 남겼습니다.`
                      : `${alarm.author.fullName}님이 ${alarm.comment.post.title.title}에 남긴 댓글: ${alarm.comment.comment}`}
                  </StyledContent>
                  <Text size={1.2} color={COLOR.CREATEDAT}>
                    {convertDate(new Date(alarm.like ? alarm.like.post.updatedAt : alarm.comment.post.updatedAt))}
                  </Text>
                </StyledContentContainer>
              </StyledAlarm>
            ))
          ) : (
            <Text style={{ padding: '0 1rem', fontSize: '1.6rem' }}>알림이 없습니다!</Text>
          )}
        </StyledAlarmContainer>
      </StyledModalContainer>
    </StyledModalWrapper>
  );
}

export default AlarmModal;

const StyledModalWrapper = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 2000;
`;

const StyledModalContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 12rem;

  width: 48rem;
  height: 64rem;
  max-width: 48rem;
  max-height: 64rem;

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
  }
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;

  min-height: 4.8rem;
  padding-left: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
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
