import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
  padding: 2rem;
  border-radius: 1rem;
`;

export { StyledCommentList };
