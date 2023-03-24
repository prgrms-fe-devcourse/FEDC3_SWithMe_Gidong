import { Avatar, Modal, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

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

export {
  StyledAlarmModal,
  StyledHeaderContainer,
  StyledHeaderItem,
  StyledAlarmContainer,
  StyledAlarm,
  StyledContentContainer,
  StyledContent,
  StyledAvatar,
  StyledNoAlarm,
};
