import { Button, Textarea } from '@/components/base';
import { StyledButtonWrapper } from './styles';

function CreateComment({ comment, ableSubmit, onSubmit }) {
  return (
    <>
      <Textarea
        value={comment.value}
        placeholder='댓글을 입력하세요.'
        max={300}
        wrapperProps={{ style: { width: '100%' } }}
        style={{ fontSize: '1.2rem', height: '16rem' }}
        handleParentChange={comment.onChange}
      />
      <StyledButtonWrapper>
        <Button fontSize='xLarge' size='full' version='primary' shape='round' disabled={!ableSubmit} onClick={onSubmit}>
          작성
        </Button>
      </StyledButtonWrapper>
    </>
  );
}

export default CreateComment;
