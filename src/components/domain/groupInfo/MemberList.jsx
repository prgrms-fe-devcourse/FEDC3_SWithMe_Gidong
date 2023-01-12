import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function MemberList({ children, ...props }) {
  return (
    <StyledMemberListContainer style={{ ...props.style }} {...props}>
      {children}
    </StyledMemberListContainer>
  );
}

export default MemberList;

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
