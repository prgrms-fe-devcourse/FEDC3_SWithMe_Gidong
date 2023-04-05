import { Icon, Text } from '@/components/base';
import useAuth from '@/hooks/useAuth';
import { checkIsEmptyObj } from '@/utils/validation';
import { StyledLikeButtonContainer } from './styles';

function FloatingLikeButton({ likes, likeButtonRef, onClick }) {
  const {
    authState: { loggedUser },
  } = useAuth();

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
      <Text size='small'>{likes.length}</Text>
    </StyledLikeButtonContainer>
  );
}

export default FloatingLikeButton;
