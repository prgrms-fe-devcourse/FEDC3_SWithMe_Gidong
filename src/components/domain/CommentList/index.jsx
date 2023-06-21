import { Divider, Text } from '@/components/base';
import CommentItem from '@/components/domain/CommentItem';

import { StyledCommentList } from './styles';

function CommentList({ comments, authorId }) {
  return (
    <>
      {comments.length ? (
        <StyledCommentList>
          {comments.map((comment, i) => {
            return (
              <div key={comment._id}>
                <CommentItem comment={comment} authorId={authorId} />
                {comments.length !== i + 1 && <Divider height='0.05rem' />}
              </div>
            );
          })}
        </StyledCommentList>
      ) : (
        <Text size='xLarge' weight={300}>
          아직 등록된 댓글이 없습니다. 댓글을 남겨 보세요!
        </Text>
      )}
    </>
  );
}

export default CommentList;
