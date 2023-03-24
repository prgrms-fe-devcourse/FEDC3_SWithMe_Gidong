import { StyledMemberListContainer } from './styles';

function MemberList({ children, ...props }) {
  return (
    <StyledMemberListContainer style={{ ...props.style }} {...props}>
      {children}
    </StyledMemberListContainer>
  );
}

export default MemberList;
