import { Icon, Text } from '@/components/base';
import { useAuthContext } from '@/context/AuthProvider';
import { checkIsEmptyObj } from '@/utils/validation';
import { StyledLikeButtonContainer } from './styles';

function FloatingLikeButton({ likes, likeButtonRef, onClick }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();

  return (
    <StyledLikeButtonContainer
      ref={likeButtonRef}
      onClick={() => !checkIsEmptyObj(loggedUser) && onClick()}
      disabled={checkIsEmptyObj(loggedUser)}>
      <Icon
        name='heart'
        size='large'
        type={likes.length && likes.filter((like) => like.user === loggedUser._id).length ? 'solid' : 'regular'}
      />
      <Text size={1.2}>{likes.length}</Text>
    </StyledLikeButtonContainer>
  );
}

export default FloatingLikeButton;
