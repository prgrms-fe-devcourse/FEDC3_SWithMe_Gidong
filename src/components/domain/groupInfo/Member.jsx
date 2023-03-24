import { Avatar, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function Member({ children, image, fullName, isMaster = false, ...props }) {
  return (
    <StyledMemberContainer style={{ ...props.style }} {...props}>
      <div>
        <Avatar src={image} />
        <Text size={2} color={COLOR.DARK}>
          {fullName}
        </Text>
        {isMaster ? <Icon name='crown' size={2} /> : null}
      </div>
      {children}
    </StyledMemberContainer>
  );
}

export default Member;

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
