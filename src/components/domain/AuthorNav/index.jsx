import { Button } from '@/components/base';
import { StyledButtonContainer } from './styles';

function AuthorNav({ onLeftButtonClick, onRightButtonClick, text = ['수정', '삭제'] }) {
  return (
    <StyledButtonContainer>
      <Button fontSize='small' version='transparent' onClick={onLeftButtonClick}>
        {text[0]}
      </Button>
      <Button fontSize='small' version='transparent' onClick={onRightButtonClick}>
        {text[1]}
      </Button>
    </StyledButtonContainer>
  );
}
export default AuthorNav;
