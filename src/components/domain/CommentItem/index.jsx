import { createAlarm, deleteAlarm } from '@/api/alarm';
import { getTIL } from '@/api/post';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Text, Textarea } from '@/components/base';
import AuthorNav from '@/components/domain/AuthorNav';
import { useAuthContext } from '@/context/AuthProvider';
import { useCommentContext } from '@/context/CommentProvider';
import { useToastContext } from '@/context/ToastProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import { isAuthor } from '@/utils/post';
import { getItem, removeItem, setItem } from '@/utils/storage';
import styled from '@emotion/styled';
import { useState } from 'react';

function CommentItem({ comment }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const { onDeleteComment, onUpdateComment } = useCommentContext();
  const { addToast } = useToastContext();

  const [mode, setMode] = useState('view');

  const { author, comment: body, updatedAt, _id: id, post: postId } = comment;
  const writtenTime = convertDate(new Date(updatedAt));

  const commentInput = useInput(body);

  const handleDeleteButtonClick = async () => {
    const { _id: commentId } = await onDeleteComment({ id });

    await deleteAlarm({
      id: getItem(commentId, ''),
    });
    removeItem(commentId);
  };

  const handleSubmitButtonClick = async () => {
    if (commentInput.value === '') {
      addToast('한 글자 이상 입력해 주세요.');
      return;
    }
    if (commentInput.value === body) {
      addToast('이전과 다른 댓글을 입력해 주세요.');
      return;
    }

    const {
      author: { _id: userId },
    } = await getTIL(postId);

    const [{ _id: deletedId }, { _id: createdId }] = await onUpdateComment(
      {
        comment: commentInput.value,
        postId,
      },
      { id },
    );

    await deleteAlarm({
      id: getItem(deletedId, ''),
    });
    removeItem(deletedId);

    const { _id: alarmId } = await createAlarm({
      notificationType: 'COMMENT',
      notificationTypeId: createdId,
      userId,
      postId,
    });
    setItem(createdId, alarmId);
  };

  const toggleEditButtonClick = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
    commentInput.onChange(body);
  };

  return (
    <StyledCommentItem>
      <StyledFlexContainer>
        <StyledWriterInfoContainer>
          <Avatar src={author.image || imgDefaultAvatar} size={3} />
          <Text size={2} color={COLOR.DARK}>
            {author.fullName}
          </Text>
        </StyledWriterInfoContainer>
        {!isAuthor(author._id, loggedUser._id) ? null : mode === 'view' ? (
          <AuthorNav onLeftButtonClick={toggleEditButtonClick} onRightButtonClick={handleDeleteButtonClick} />
        ) : (
          <AuthorNav
            onLeftButtonClick={handleSubmitButtonClick}
            onRightButtonClick={toggleEditButtonClick}
            text={['완료', '취소']}
          />
        )}
      </StyledFlexContainer>
      <Text size={1.2} color={COLOR.DARK}>
        {writtenTime}
      </Text>
      <StyledCommentWrapper>
        {!isAuthor(author._id, loggedUser._id) || mode === 'view' ? (
          <Text size={1.8} color={COLOR.DARK}>
            {body}
          </Text>
        ) : (
          <Textarea
            value={commentInput.value}
            placeholder='댓글을 입력하세요.'
            max={300}
            wrapperProps={{ style: { width: '100%', border: `0.1rem solid ${COLOR.DARK}` } }}
            style={{ fontSize: '1.2rem', height: '16rem' }}
            handleParentChange={commentInput.onChange}
          />
        )}
      </StyledCommentWrapper>
    </StyledCommentItem>
  );
}

export default CommentItem;

const StyledCommentItem = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 1.6rem;
  background-color: ${COLOR.TEXTAREA_BG};
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledCommentWrapper = styled.div`
  margin-top: 2rem;
`;
