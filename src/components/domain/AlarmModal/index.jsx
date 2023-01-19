import { Header, Text } from '@/components/base';
import useClickAway from '@/hooks/useClickAway';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function AlarmModal({ visible, onClose }) {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  return (
    <StyledModalWrapper visible={visible}>
      <StyledModalContainer ref={ref}>
        <StyledHeader level={1} strong={+true} size='2rem'>
          알람
        </StyledHeader>
        <StyledAlarmContainer>
          <StyledAlarm>
            <Text size={1.6}>[제목]에 댓글이 달렸습니다.</Text>
          </StyledAlarm>
          <StyledAlarm>
            <Text size={1.6}>[제목]에 좋아요가 눌렸습니다.</Text>
          </StyledAlarm>
        </StyledAlarmContainer>
      </StyledModalContainer>
    </StyledModalWrapper>
  );
}

export default AlarmModal;

const StyledModalWrapper = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 1000;
`;

const StyledModalContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 12rem;

  width: 24rem;
  height: 30rem;
  padding: 2rem 0;

  background-color: ${COLOR.TEXTAREA_BG};
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
`;

const StyledHeader = styled(Header)`
  padding: 0 2rem;
`;

const StyledAlarmContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100% - 4rem);
  margin-top: 2rem;
  overflow-y: scroll;
`;

const StyledAlarm = styled.div`
  padding: 0.6rem 2rem;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.GRAY};
  }
`;
