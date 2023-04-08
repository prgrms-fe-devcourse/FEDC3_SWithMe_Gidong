import { createNotification, deleteNotification } from '@/api/notification';

import { Avatar, Text, Textarea } from '@/components/base';
import AuthorNav from '@/components/domain/AuthorNav';

import { useCreateComment, useDeleteComment } from '@/hooks/queries/comments';
import useInput from '@/hooks/useInput';
import useToasts from '@/hooks/useToasts';

import { convertDate } from '@/utils/date';
import { isAuthor } from '@/utils/post';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { userState } from '@/stores/user';
import { useRecoilValue } from 'recoil';

import { useState } from 'react';

import { COLOR } from '@/styles/color';
import { StyledCommentItem, StyledCommentWrapper, StyledFlexContainer, StyledWriterInfoContainer } from './styles';

function CommentItem({ comment, authorId }) {
  const { author, comment: body, updatedAt, _id: id, post: postId } = comment;
  const writtenTime = convertDate(new Date(updatedAt));

  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const { addToast } = useToasts();

  const loggedUser = useRecoilValue(userState);
  const [mode, setMode] = useState('view');
  const commentInput = useInput(body);

  const handleDeleteButtonClick = async () => {
    await deleteComment.mutate(
      { id },
      {
        onSuccess: async ({ _id: commentId }) => {
          await deleteNotification({ id: getItem(commentId, '') });
          removeItem(commentId);
        },
      },
    );
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

    await deleteComment.mutate(
      { id },
      {
        onSuccess: async ({ _id: commentId }) => {
          await deleteNotification({ id: getItem(commentId, '') });
          removeItem(commentId);
        },
      },
    );

    await createComment.mutate(
      {
        comment: commentInput.value,
        postId,
      },
      {
        onSuccess: async ({ _id: notificationTypeId }) => {
          const { _id: alarmId } = await createNotification({
            notificationType: 'COMMENT',
            notificationTypeId,
            userId: authorId,
            postId,
          });
          setItem(notificationTypeId, alarmId);
        },
      },
    );
  };

  const toggleEditButtonClick = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
    commentInput.onChange(body);
  };

  return (
    <StyledCommentItem>
      <StyledFlexContainer>
        <StyledWriterInfoContainer>
          <Avatar src={author.image} />
          <Text size='xLarge' color={COLOR.DARK}>
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
      <Text size='small' color={COLOR.DARK}>
        {writtenTime}
      </Text>
      <StyledCommentWrapper>
        {!isAuthor(author._id, loggedUser._id) || mode === 'view' ? (
          <Text size='large' color={COLOR.DARK}>
            {body}
          </Text>
        ) : (
          <Textarea
            value={commentInput.value}
            placeholder='댓글을 입력하세요.'
            max={300}
            needBorder
            handleParentChange={commentInput.onChange}
          />
        )}
      </StyledCommentWrapper>
    </StyledCommentItem>
  );
}

export default CommentItem;
