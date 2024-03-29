import { createNotification, deleteNotification } from '@/api/notification';

import { Avatar, Button, Divider, Heading, Spinner, Tag, Text } from '@/components/base';
import AuthorNav from '@/components/domain/AuthorNav';
import CommentList from '@/components/domain/CommentList';
import CreateComment from '@/components/domain/CreateComment';
import FloatingLikeButton from '@/components/domain/FloatingLikeButton';

import { useCreateComment } from '@/hooks/queries/comments';
import { useCreateLike, useDeleteLike } from '@/hooks/queries/likes';
import { useDeleteTIL, useGetTIL } from '@/hooks/queries/tils';
import useInput from '@/hooks/useInput';

import { convertDate } from '@/utils/date';
import { isMember } from '@/utils/group';
import { isAuthor } from '@/utils/post';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { checkAbleSubmit, checkIsEmptyObj } from '@/utils/validation';

import { Viewer } from '@toast-ui/react-editor';

import { userState } from '@/stores/user';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function TIL() {
  const navigate = useNavigate();
  const { id } = useParams();

  const loggedUser = useRecoilValue(userState);

  const { data: til, isLoading } = useGetTIL(id);
  const deleteTIL = useDeleteTIL();
  const createComment = useCreateComment();
  const createLike = useCreateLike();
  const deleteLike = useDeleteLike();

  const viewerRef = useRef(null);
  const comment = useInput('');
  const likeButtonRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ableSubmit = useMemo(() => checkAbleSubmit([comment.value.length]), [comment.value]);

  const handleDeleteButtonClick = async () => {
    if (!confirm('정말 삭제하시겠습니까? 한번 삭제하면 되돌릴 수 없습니다.')) return;

    deleteTIL.mutate({ id: til._id });
    navigate('/myGroup');
  };

  const handleSubmitButtonClick = async () => {
    if (!ableSubmit) return;

    const {
      _id: postId,
      author: { _id: userId },
    } = til;

    await createComment.mutate(
      {
        comment: comment.value,
        postId,
      },
      {
        onSuccess: async ({ _id: notificationTypeId }) => {
          const { _id: alarmId } = await createNotification({
            notificationType: 'COMMENT',
            notificationTypeId,
            userId,
            postId,
          });
          setItem(notificationTypeId, alarmId);
          comment.onChange('');
        },
      },
    );
  };

  const handleLikeToggle = async () => {
    const loggedUserLike = til.likes.find((like) => like.user === loggedUser._id);

    if (!loggedUserLike) {
      const {
        _id: postId,
        author: { _id: userId },
      } = til;

      await createLike.mutate(
        {
          comment: comment.value,
          postId,
        },
        {
          onSuccess: async ({ _id: notificationTypeId }) => {
            const { _id: alarmId } = await createNotification({
              notificationType: 'LIKE',
              notificationTypeId,
              userId,
              postId,
            });
            setItem(notificationTypeId, alarmId);
          },
        },
      );

      return;
    }

    await deleteLike.mutate(
      {
        id: loggedUserLike._id,
      },
      {
        onSuccess: async ({ _id: likeId }) => {
          await deleteNotification({
            id: getItem(likeId, ''),
          });
          removeItem(likeId);
        },
      },
    );
  };

  return (
    <StyledPageWrapper>
      <StyledTIL className='til'>
        {isLoading ? (
          <Spinner size='xLarge' color={COLOR.TAG_COLOR[1]} />
        ) : (
          <>
            <FloatingLikeButton likes={til.likes} likeButtonRef={likeButtonRef} onClick={handleLikeToggle} />
            <StyledHeader>
              <Heading level={1}>📚 [{til.channel.name}]에 대한 TIL</Heading>
              {!isMember(til.channel, loggedUser._id) && (
                <>
                  <Button
                    fontSize='xLarge'
                    size='medium'
                    shape='round'
                    onClick={() => navigate('/joinGroup', { state: { group: til.channel } })}>
                    그룹 가입하기
                  </Button>
                  <div className='hide'></div>
                </>
              )}
            </StyledHeader>
            <StyledTitleWrapper>
              <Text size='huge' weight={500}>
                {til.title.title}
              </Text>
            </StyledTitleWrapper>
            <StyledFlexContainer>
              <StyledWriterInfoContainer>
                <Avatar src={til.author.image} />
                <Text size='xLarge' color={COLOR.DARK}>
                  {til.author.fullName}
                </Text>
              </StyledWriterInfoContainer>
              {isAuthor(til.author._id, loggedUser._id) && (
                <AuthorNav
                  onLeftButtonClick={() => navigate(`/updateTIL/${til._id}`, { state: { til } })}
                  onRightButtonClick={handleDeleteButtonClick}
                />
              )}
            </StyledFlexContainer>
            <Text color={COLOR.DARK}>{convertDate(new Date(til.createdAt))}</Text>
            <StyledViewerWrapper>{<Viewer ref={viewerRef} initialValue={til.title.body || ''} />}</StyledViewerWrapper>
            <Tag tagList={til.title.tagList} />
            <Divider height='0.05rem' margin={4} />
            {!checkIsEmptyObj(loggedUser) && (
              <CreateComment comment={comment} ableSubmit={ableSubmit} onSubmit={handleSubmitButtonClick} />
            )}
            <StyledCommentListWrapper marginTop={checkIsEmptyObj(loggedUser) ? '0' : '4rem'}>
              <CommentList comments={til.comments} authorId={til.author._id} />
            </StyledCommentListWrapper>
          </>
        )}
      </StyledTIL>
    </StyledPageWrapper>
  );
}

export default TIL;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledTIL = styled.div`
  position: relative;
  flex: 1;
  padding: 16rem 8rem 8rem 8rem;

  @media (max-width: 624px) {
    padding: 12rem 4rem 8rem 4rem;
  }

  background-color: ${COLOR.MY_GROUP_BG};

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledTitleWrapper = styled.div`
  margin: 4rem 0 1rem 0;
`;

const StyledWriterInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledViewerWrapper = styled.div`
  padding: 1.6rem;
  margin: 3rem 0 1rem 0;
  border-radius: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
  min-height: 40rem;
`;

const StyledCommentListWrapper = styled.div`
  margin-top: ${({ marginTop }) => marginTop};
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 4rem 2rem;

  & > h1 {
    flex: 1 1 auto;
    order: 1;
  }

  .hide {
    visibility: collapse;
  }
`;
