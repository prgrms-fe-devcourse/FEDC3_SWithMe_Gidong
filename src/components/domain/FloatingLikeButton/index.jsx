import { Icon, Text } from '@/components/base';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import { checkIsEmptyObj } from '@/utils/validation';
import styled from '@emotion/styled';

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
        size={3}
        type={likes.length && likes.filter((like) => like.user === loggedUser._id).length ? 'solid' : 'regular'}
      />
      <Text size={1.2}>{likes.length}</Text>
    </StyledLikeButtonContainer>
  );
}

export default FloatingLikeButton;

const StyledLikeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: fixed;
  right: 6rem;
  bottom: 6rem;
  z-index: 2000;

  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${COLOR.WHITE};
  box-shadow: 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;
