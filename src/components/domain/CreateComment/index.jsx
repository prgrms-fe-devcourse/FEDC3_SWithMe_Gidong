import { Button, Textarea } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledButtonWrapper } from './styles';

function CreateComment({ comment, ableSubmit, onSubmit }) {
  return (
    <>
      <Textarea
        value={comment.value}
        placeholder='댓글을 입력하세요.'
        max={300}
        handleParentChange={comment.onChange}
      />
      <StyledButtonWrapper>
        <Button
          as='button'
          disabled={!ableSubmit}
          bgcolor={!ableSubmit ? COLOR.GRAY : COLOR.PRIMARY_BTN}
          color={!ableSubmit ? COLOR.DARK : COLOR.WHITE}
          style={{ fontSize: '2.2rem', padding: '1.3rem 7rem', borderRadius: '1rem', width: '100%' }}
          onClick={onSubmit}>
          작성
        </Button>
      </StyledButtonWrapper>
    </>
  );
}

export default CreateComment;
