import { createAlarm, deleteAlarm } from '@/api/alarm';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Divider, Header, Tag, Text } from '@/components/base';
import AuthorNav from '@/components/domain/AuthorNav';
import CommentList from '@/components/domain/CommentList';
import CreateComment from '@/components/domain/CreateComment';
import FloatingLikeButton from '@/components/domain/FloatingLikeButton';
import { useAuthContext } from '@/context/AuthProvider';
import { useCommentContext } from '@/context/CommentProvider';
import { useLikeContext } from '@/context/LikeProvider';
import { useTILContext } from '@/context/TILProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import { isMember } from '@/utils/group';
import { isAuthor } from '@/utils/post';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { checkAbleSubmit, checkIsEmptyObj } from '@/utils/validation';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TIL() {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const navigate = useNavigate();
  const { onDeleteTIL, onGetTIL } = useTILContext();
  const { comments, onInitComment, onCreateComment } = useCommentContext();
  const { likes, onInitLike, onCreateLike, onDeleteLike } = useLikeContext();
  const viewerRef = useRef(null);
  const comment = useInput('');
  const likeButtonRef = useRef(null);

  const { id } = useParams();
  const [til, setTil] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTIL = useCallback(async () => {
    const response = await onGetTIL(id);
    await setTil(response);

    return response;
  }, [id]);

  const init = useCallback(async (til) => {
    await onInitComment(til.comments);
    await onInitLike(til.likes);
  }, []);

  useEffect(() => {
    if (!id) return;

    (async () => {
      const til = await getTIL();
      init(til);
    })();
  }, [id]);

  const ableSubmit = useMemo(() => checkAbleSubmit([comment.value.length]), [comment.value]);

  const handleDeleteButtonClick = async () => {
    if (!confirm('정말 삭제하시겠습니까? 한번 삭제하면 되돌릴 수 없습니다.')) return;

    await onDeleteTIL({
      id: til._id,
    });
    navigate('/myGroup');
  };

  const handleSubmitButtonClick = async () => {
    if (!ableSubmit) return;

    const {
      _id: postId,
      author: { _id: userId },
    } = til;
    const { _id: notificationTypeId } = await onCreateComment({
      comment: comment.value,
      postId,
    });
    const { _id: alarmId } = await createAlarm({
      notificationType: 'COMMENT',
      notificationTypeId,
      userId,
      postId,
    });
    setItem(notificationTypeId, alarmId);

    comment.onChange('');
  };

  const toggleLikeButtonClick = async () => {
    const loggedUserLike = likes.find((like) => like.user === loggedUser._id);

    if (!loggedUserLike) {
      const {
        _id: postId,
        author: { _id: userId },
      } = til;
      const { _id: notificationTypeId } = await onCreateLike({
        comment: comment.value,
        postId,
      });
      const { _id: alarmId } = await createAlarm({
        notificationType: 'LIKE',
        notificationTypeId,
        userId,
        postId,
      });

      setItem(notificationTypeId, alarmId);
    } else {
      const { _id: likeId } = await onDeleteLike({
        id: loggedUserLike._id,
      });
      await deleteAlarm({
        id: getItem(likeId, ''),
      });

      removeItem(likeId);
    }
  };

  return (
    <StyledPageWrapper>
      <StyledTIL className='til'>
        {!checkIsEmptyObj(til) && (
          <>
            <FloatingLikeButton likes={likes} likeButtonRef={likeButtonRef} onClick={toggleLikeButtonClick} />
            <StyledHeader>
              <Header level={1} strong size={40} color={COLOR.DARK}>
                📚 [{til.channel.name}]에 대한 TIL
              </Header>
              {!isMember(til.channel, loggedUser._id) && (
                <>
                  <Button
                    as='button'
                    bgcolor={COLOR.PRIMARY_BTN}
                    color={COLOR.WHITE}
                    style={{ fontSize: '2.2rem', padding: '1.3rem 3rem', borderRadius: '1rem' }}
                    onClick={() => navigate('/joinGroup', { state: { group: til.channel } })}>
                    그룹 가입하기
                  </Button>
                  <div className='hide'></div>
                </>
              )}
            </StyledHeader>
            <StyledTitleWrapper>
              <Text size={3.2} weight={500}>
                {til.title.title}
              </Text>
            </StyledTitleWrapper>
            <StyledFlexContainer>
              <StyledWriterInfoContainer>
                <Avatar src={til.author.image || imgDefaultAvatar} size={3} />
                <Text size={2} color={COLOR.DARK}>
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
            <Text size={1.4} color={COLOR.DARK}>
              {convertDate(new Date(til.createdAt))}
            </Text>
            <StyledViewerWrapper>{<Viewer ref={viewerRef} initialValue={til.title.body || ''} />}</StyledViewerWrapper>
            <Tag tagList={til.title.tagList} />
            <Divider color={COLOR.GRAY} height={0.05} size={4} />
            {!checkIsEmptyObj(loggedUser) && (
              <CreateComment comment={comment} ableSubmit={ableSubmit} onSubmit={handleSubmitButtonClick} />
            )}
            <StyledCommentListWrapper marginTop={checkIsEmptyObj(loggedUser) ? '0' : '4rem'}>
              <CommentList comments={comments} />
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

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;

  & > span:hover {
    text-decoration: underline;
  }
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
