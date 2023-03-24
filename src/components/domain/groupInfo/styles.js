import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledIntroductionContainer = styled.div`
  width: 100%;
`;

const StyledTextWrapper = styled.div`
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
`;

const StyledMemberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: ${COLOR.GRAY};
  border-radius: 0.5rem;

  &:not(:nth-last-of-type(1)) {
    margin-bottom: 1rem;
  }

  & > div {
    display: flex;
    align-items: center;

    & > :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const StyledMemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: scroll;
  height: 30rem;
  width: 100%;
  background-color: ${COLOR.TEXTAREA_BG};
  border-radius: 1rem;
`;

export { StyledIntroductionContainer, StyledTextWrapper, StyledMemberContainer, StyledMemberListContainer };
