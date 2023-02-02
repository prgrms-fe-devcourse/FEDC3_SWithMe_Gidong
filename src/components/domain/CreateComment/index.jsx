import { Button, Textarea } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function CreateComment({ comment, ableSubmit, onSubmit }) {
  return (
    <>
      <Textarea
        defaultValue={comment.value}
        placeholder='댓글을 입력하세요.'
        max={300}
        wrapperProps={{ style: { width: '100%' } }}
        style={{ fontSize: '1.2rem', height: '16rem' }}
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

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;

  & > span:hover {
    text-decoration: underline;
  }

  align-self: flex-end;
`;
