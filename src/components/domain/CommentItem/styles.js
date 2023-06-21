import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';

const StyledCommentItem = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1.6rem;
  background-color: ${COLOR.TEXTAREA_BG};
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledCommentWrapper = styled.div`
  margin-top: 2rem;
`;

export { StyledCommentItem, StyledFlexContainer, StyledWriterInfoContainer, StyledCommentWrapper };
