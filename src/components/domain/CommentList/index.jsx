import { Divider, Text } from '@/components/base';
import CommentItem from '@/components/domain/CommentItem';
import { COLOR } from '@/styles/color';
import { StyledCommentList } from './styles';

function CommentList({ comments }) {
  return (
    <>
      {comments.length ? (
        <StyledCommentList>
          {comments.map((comment, i) => {
            return (
              <div key={comment._id}>
                <CommentItem comment={comment} />
                {comments.length !== i + 1 && <Divider height='0.05rem' />}
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
