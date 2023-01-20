import { deleteAlarm } from '@/api/alarm';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Text, Textarea } from '@/components/base';
import { useAuthContext } from '@/context/AuthProvider';
import { useCommentContext } from '@/context/CommentProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import { getItem, removeItem } from '@/utils/storage';
import styled from '@emotion/styled';
import { useState } from 'react';

function CommentItem({ comment }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const { onDeleteComment, onUpdateComment } = useCommentContext();
  const [mode, setMode] = useState('view');

  const { author, comment: body, updatedAt, _id: id, post } = comment;
  const writtenTime = convertDate(new Date(updatedAt));

  const commentInput = useInput(body);

  const handleDeleteButtonClick = async () => {
    const data = { id };
    const deletedComment = await onDeleteComment(data);

    const alarmData = {
      id: getItem(deletedComment._id, ''),
    };
    await deleteAlarm(alarmData);

    removeItem(deletedComment._id);
  };

  const handleSubmitButtonClick = async () => {
    if (commentInput.value === '') {
      alert('한 글자 이상 입력해 주세요.');
      return;
    }
    if (commentInput.value === body) {
      alert('이전과 다른 댓글을 입력해 주세요.');
      return;
    }

    const deleteData = { id };
    const createData = {
      comment: commentInput.value,
      postId: post,
    };

    await onUpdateComment(createData, deleteData);
  };

  const toggleEditButtonClick = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
  };

  return (
    <StyledCommentItem>
      <FlexContainer>
        <StyledWriterInfoContainer>
          <Avatar src={author.image || imgDefaultAvatar} size={3} />
          <Text size={2} color={COLOR.DARK}>
            {author.fullName}
          </Text>
        </StyledWriterInfoContainer>
        {author._id !== loggedUser._id ? null : mode === 'view' ? (
          <StyledButtonContainer>
            <Button
              as='span'
              style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}
              onClick={toggleEditButtonClick}>
              수정
            </Button>
            <Button
              as='span'
              style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}
              onClick={handleDeleteButtonClick}>
              삭제
            </Button>
          </StyledButtonContainer>
        ) : (
          <StyledButtonContainer>
            <Button
              as='span'
              style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}
              onClick={handleSubmitButtonClick}>
              완료
            </Button>
            <Button
              as='span'
              style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}
              onClick={toggleEditButtonClick}>
              취소
            </Button>
          </StyledButtonContainer>
        )}
      </FlexContainer>
      <Text size={1.2} color={COLOR.DARK}>
        {writtenTime}
      </Text>
      <StyledCommentWrapper>
        {author._id !== loggedUser._id ? (
          <Text size={1.8} color={COLOR.DARK}>
            {body}
          </Text>
        ) : mode === 'view' ? (
          <Text size={1.8} color={COLOR.DARK}>
            {body}
          </Text>
        ) : (
          <Textarea
            defaultValue={commentInput.value}
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledWriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  & > span:hover {
    text-decoration: underline;
  }
`;

const StyledCommentWrapper = styled.div`
  margin-top: 2rem;
`;
