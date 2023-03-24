import { imgUserAvatar } from '@/assets/images';
import { Avatar, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledMemberContainer } from './styles';

function Member({ children, image, fullName, isMaster = false, ...props }) {
  return (
    <StyledMemberContainer style={{ ...props.style }} {...props}>
      <div>
        <Avatar src={image || imgUserAvatar} size={3} />
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
