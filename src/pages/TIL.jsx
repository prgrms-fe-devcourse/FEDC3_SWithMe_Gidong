import { createAlarm, deleteAlarm } from '@/api/alarm';
import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Divider, Header, Icon, Tag, Text, Textarea } from '@/components/base';
import CommentList from '@/components/domain/CommentList';
import { useAuthContext } from '@/context/AuthProvider';
import { useCommentContext } from '@/context/CommentProvider';
import { useLikeContext } from '@/context/LikeProvider';
import { useTILContext } from '@/context/TILProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { checkAbleSubmit } from '@/utils/validation';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

  useEffect(() => {
    const getTIL = async () => {
      const response = await onGetTIL(id);
      setTil(response);
    };

    if (id) {
      getTIL();
    }
  }, [id]);

  useEffect(() => {
    const initComment = async () => {
      await onInitComment(til.comments);
    };

    const initLike = async () => {
      await onInitLike(til.likes);
    };

    if (til) {
      initComment();
      initLike();
    }
  }, [til]);

  const ableSubmit = useMemo(() => checkAbleSubmit([comment.value.length]), [comment.value]);

  const handleDeleteButtonClick = async () => {
    if (!confirm('정말 삭제하시겠습니까? 한번 삭제하면 되돌릴 수 없습니다.')) return;

    const data = {
      id: til._id,
    };

    await onDeleteTIL(data);
    navigate('/myGroup');
  };

  const handleSubmitButtonClick = async () => {
    if (!ableSubmit) return;

    const data = {
      comment: comment.value,
      postId: til._id,
    };

    await onCreateComment(data);
    comment.onChange('');
  };

  const toggleLikeButtonClick = async () => {
    const loggedUserLike = likes.filter((like) => like.user === loggedUser._id);

    if (loggedUserLike.length === 0) {
      const data = {
        comment: comment.value,
        postId: til._id,
      };
      const like = await onCreateLike(data);

      const alarmData = {
        notificationType: 'LIKE',
        notificationTypeId: like._id,
        userId: til.author._id,
        postId: til._id,
      };
      const alarm = await createAlarm(alarmData);

      setItem(like._id, alarm._id);
    } else {
      const data = {
        id: loggedUserLike[0]._id,
      };
      const like = await onDeleteLike(data);

      const alarmData = {
        id: getItem(like._id, ''),
      };
      await deleteAlarm(alarmData);

      removeItem(like._id);
    }
  };

  return (
    <StyledPageWrapper>
      <StyledTIL className='til'>
        {til && (
          <>
            <StyledLikeButton ref={likeButtonRef} onClick={toggleLikeButtonClick}>
              {likes.length && likes.filter((like) => like.user === loggedUser._id).length ? (
                <Icon name='heart' size={3} />
              ) : (
                <Icon type='regular' name='heart' size={3} />
              )}
              <Text size={1.2}>{likes.length}</Text>
            </StyledLikeButton>
            <Header level={1} strong size={40} color={COLOR.DARK}>
              📚 [{til.channel.name}]에 대한 TIL
            </Header>
            <StyledTitleWrapper>
              <Text size={3.2} weight={500}>
                {til.title.title}
              </Text>
            </StyledTitleWrapper>
            <FlexContainer>
              <StyledWriterInfoContainer>
                <Avatar src={til.author.image || imgDefaultAvatar} size={3} />
                <Text size={2} color={COLOR.DARK}>
                  {til.author.fullName}
                </Text>
              </StyledWriterInfoContainer>
              {til.author._id === loggedUser._id && (
                <StyledButtonContainer>
                  <Link to={`/updateTIL/${til._id}`} state={{ til }}>
                    <Button as='span' style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}>
                      수정
                    </Button>
                  </Link>
                  <Button
                    as='span'
                    style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}
                    onClick={handleDeleteButtonClick}>
                    삭제
                  </Button>
                </StyledButtonContainer>
              )}
            </FlexContainer>
            <Text size={1.4} color={COLOR.DARK}>
              {convertDate(new Date(til.createdAt))}
            </Text>
            <StyledViewerWrapper>{<Viewer ref={viewerRef} initialValue={til.title.body || ''} />}</StyledViewerWrapper>
            <Tag tagList={til.title.tagList} />
            <Divider color={COLOR.GRAY} height={0.05} size={4} />
            <Textarea
              defaultValue={comment.value}
              placeholder='댓글을 입력하세요.'
              max={300}
              wrapperProps={{ style: { width: '100%' } }}
              style={{ fontSize: '1.2rem', height: '16rem' }}
              handleParentChange={comment.onChange}
            />
            <StyledButtonContainer isEnd={true}>
              <Button
                as='button'
                disabled={!ableSubmit}
                bgcolor={!ableSubmit ? COLOR.GRAY : COLOR.PRIMARY_BTN}
                color={!ableSubmit ? COLOR.DARK : COLOR.WHITE}
                style={{ fontSize: '2.2rem', padding: '1.3rem 7rem', borderRadius: '1rem', width: '100%' }}
                round={+true}
                onClick={handleSubmitButtonClick}>
                작성
              </Button>
            </StyledButtonContainer>
            <StyledCommentListWrapper>
              <CommentList comments={comments} />
            </StyledCommentListWrapper>
          </>
        )}
      </StyledTIL>
    </StyledPageWrapper>
  );
}

export default TIL;

const FlexContainer = styled.div`
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
  padding: 8rem;
  margin-top: 8rem;
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

  & > span:hover {
    text-decoration: underline;
  }

  align-self: ${({ isEnd }) => (isEnd ? 'flex-end' : 'center')};
`;

const StyledViewerWrapper = styled.div`
  padding: 1.6rem;
  margin: 3rem 0 1rem 0;
  border-radius: 1rem;
  background-color: ${COLOR.TEXTAREA_BG};
  min-height: 40rem;
`;

const StyledCommentListWrapper = styled.div`
  margin-top: 4rem;
`;

const StyledLikeButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: fixed;
  right: 6rem;
  bottom: 6rem;
  z-index: 2000;

  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  cursor: pointer;

  background-color: ${COLOR.WHITE};
  box-shadow: 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;
