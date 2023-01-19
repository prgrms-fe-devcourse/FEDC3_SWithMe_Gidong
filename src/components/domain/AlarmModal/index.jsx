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
    const getAlarm = async () => {
      const data = await getAlarms();
      return data;
    };

    if (visible) {
      (async () => {
        const alarms = await getAlarm();
        alarms?.sort((a, b) => new Date(a.updatedAt) - new Date(b.createdAt));

        setAlarms(alarms);
      })();
    }
  }, [visible]);

  const handleAlarmClick = (postId) => {
    navigate(`/TIL/${postId}`);
    onClose && onClose();
  };

  return (
    <StyledModalWrapper visible={visible}>
      <StyledModalContainer ref={ref}>
        <StyledHeader level={1} strong={+true} size='2rem'>
          알람
        </StyledHeader>
        <StyledAlarmContainer>
          {alarms.length !== 0 ? (
            alarms.map((alarm) => (
              <StyledAlarm key={alarm._id} onClick={() => handleAlarmClick(alarm.post)}>
                <Text size={1.6} color={'black'}>{`[${
                  alarm.like ? alarm.like.post.title.title : alarm.comment.post.title.title
                }]에 ${alarm.like ? '좋아요가 눌렸습니다.' : '댓글이 달렸습니다.'}`}</Text>
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
  padding: 2rem 1rem;

  background-color: ${COLOR.TEXTAREA_BG};
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
`;

const StyledHeader = styled(Header)`
  padding: 0 1rem;
`;

const StyledAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100% - 4rem);
  margin-top: 2rem;
  overflow-y: scroll;
`;

const StyledAlarm = styled.div`
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.GRAY};
  }
`;
