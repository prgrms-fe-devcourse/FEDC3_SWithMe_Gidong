import { Text, Divider } from '@/components/base';
import CommentItem from '@/components/domain/CommentItem';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function CommentList({ comments }) {
  return (
    <>
      {comments.length ? (
        <StyledCommentList>
          {comments.map((comment, i) => {
            return (
              <div key={comment._id}>
                <CommentItem comment={comment} />
                {comments.length !== i + 1 && <Divider color={COLOR.GRAY} height={0.05} size={1} />}
              </div>
            );
          })}
        </StyledCommentList>
      ) : (
        <Text size={2} weight={300}>
          아직 등록된 댓글이 없습니다. 댓글을 남겨 보세요!
        </Text>
      )}
    </>
  );
}

export default CommentList;

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
  padding: 2rem;
  border-radius: 1rem;
`;
