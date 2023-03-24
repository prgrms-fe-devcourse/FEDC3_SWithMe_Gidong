import { Button } from '@/components/base';
import { StyledButtonContainer } from './styles';

function AuthorNav({ onLeftButtonClick, onRightButtonClick, text = ['수정', '삭제'] }) {
  return (
    <StyledButtonContainer>
      <Button as='span' style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }} onClick={onLeftButtonClick}>
        {text[0]}
      </Button>
      <Button as='span' style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }} onClick={onRightButtonClick}>
        {text[1]}
      </Button>
    </StyledButtonContainer>
  );
}
export default AuthorNav;
