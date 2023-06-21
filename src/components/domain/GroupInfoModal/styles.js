import { Modal } from '@/components/base';
import styled from '@emotion/styled';

const StyledModal = styled(Modal)`
  width: 70rem;
  @media (max-width: 624px) {
    width: 100%;
  }
`;

const StyledHeaderContainer = styled.div`
  padding: 0.5rem 2rem 0 2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;

  & > :nth-of-type(2) {
    width: 80%;
    padding-top: 2rem;
  }

  & > span {
    text-align: center;
  }
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem 5%;
`;

const StyledMemberListContainerLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 3rem 0 1rem 0;

  & > div:first-of-type {
    width: 30rem;
    margin-left: 1rem;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
`;

export {
  StyledModal,
  StyledHeaderContainer,
  StyledContentContainer,
  StyledMemberListContainerLabel,
  StyledButtonWrapper,
};
