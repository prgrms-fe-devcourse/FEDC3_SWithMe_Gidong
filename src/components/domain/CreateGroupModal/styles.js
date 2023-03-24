import { Modal } from '@/components/base';
import styled from '@emotion/styled';

const StyledModal = styled(Modal)`
  width: 50rem;
  @media (max-width: 624px) {
    width: 100%;
  }
`;

const StyledHeaderContainer = styled.div`
  padding: 0.5rem 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 30rem;
  padding: 0 15%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15% 2rem;
`;

export { StyledModal, StyledHeaderContainer, StyledContentContainer, StyledButtonContainer };
