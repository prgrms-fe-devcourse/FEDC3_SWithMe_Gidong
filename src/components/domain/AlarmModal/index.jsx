import { getAlarms } from '@/api/alarm';
import { Header, Text } from '@/components/base';
import useClickAway from '@/hooks/useClickAway';
import { COLOR } from '@/styles/color';
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
      alarms?.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

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
                <Text size={1.6} color={'black'}>
                  {alarm.like
                    ? `${alarm.author.fullName}님이 ${alarm.like.post.title.title}에 댓글을 남겼습니다.`
                    : `${alarm.author.fullName}님이 ${alarm.comment.post.title.title}에 공감을 남겼습니다.`}
                </Text>
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

  width: 24rem;
  height: 30rem;
  padding-bottom: 2rem;

  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Header)`
  padding: 2rem 2rem 1rem 2rem;
`;

const StyledAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 4rem);
  overflow: auto;
`;

const StyledAlarm = styled.div`
  cursor: pointer;
  margin: 0 1rem;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${COLOR.GRAY};
  }
`;
