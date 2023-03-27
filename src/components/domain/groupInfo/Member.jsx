import { Avatar, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledMemberContainer } from './styles';

function Member({ children, image, fullName, isMaster = false, ...props }) {
  return (
    <StyledMemberContainer style={{ ...props.style }} {...props}>
      <div>
        <Avatar src={image} />
        <Text size={2} color={COLOR.DARK}>
          {fullName}
        </Text>
        {isMaster ? <Icon name='crown' size='medium' /> : null}
      </div>
      {children}
    </StyledMemberContainer>
  );
}

export default Member;
