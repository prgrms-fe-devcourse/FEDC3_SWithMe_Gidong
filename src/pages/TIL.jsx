import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Divider, Header, Icon, Tag, Text, Textarea } from '@/components/base';
import CommentList from '@/components/domain/CommentList';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function checkAbleSubmit(len) {
  return len !== 0;
}

function TIL() {
  const viewerRef = useRef(null);
  const comment = useInput('');

  const {
    state: { til },
  } = useLocation();
  const {
    author,
    comments,
    likes,
    createdAt,
    title: { title, body, tagList },
  } = til;
  const writtenTime = convertDate(new Date(createdAt));

  const ableSubmit = useMemo(() => checkAbleSubmit(comment.value.length), [comment.value]);

  const handleSubmitButtonClick = () => {
    if (!ableSubmit) return;

    // TODO: COMMENT WRITE API CALL WITH BELOW DATA

    /* 
      POST /comments/create

      token

      comment: string,
      postId: til._id
    */

    const data = {
      comment: comment.value,
      postId: til._id,
    };
  };

  const handleLikeButtonClick = () => {
    // TODO: LIKE API CALL WITH BELOW DATA

    /* 
      POST /likes/create

      token

      comment: string,
      postId: til._id


      DELETE /likes/delete

      token

      postId: til._id
    */

    const data = {
      postId: til._id,
    };
  };

  return (
    <StyledPageWrapper>
      <StyledTIL>
        <StyledLikeButton as='span' onClick={handleLikeButtonClick}>
          {/* TODO: 공감 버튼 누른 여부에 따라 fill 여부 결정 */}
          {/* {likes.length && likes.filter((like) => like.user === currentUser._id)} */}
          {/* <Icon name='heart' size={3} /> */}
          <Icon type='regular' name='heart' size={3} />
          <Text size={1.2}>{likes.length}</Text>
        </StyledLikeButton>
        <Header level={1} strong size={40} color={COLOR.DARK}>
          📚 [{til.channel.name}]에 대한 TIL
        </Header>
        <StyledTitleWrapper>
          <Text size={3.2} weight={500}>
            {title}
          </Text>
        </StyledTitleWrapper>
        <FlexContainer>
          <StyledWriterInfoContainer>
            <Avatar src={author.image || imgDefaultAvatar} size={3} />
            <Text size={2} color={COLOR.DARK}>
              {author.fullName}
            </Text>
          </StyledWriterInfoContainer>
          {/* TODO: 수정, 삭제 버튼 auth 값과 비교 후 visible 어부 결정, admin 까지 */}
          {/* {author.email === currentUser} */}
          <StyledButtonContainer>
            <Button as='span' style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}>
              수정
            </Button>
            <Button as='span' style={{ backgroundColor: 'transparent', fontSize: '1.4rem' }}>
              삭제
            </Button>
          </StyledButtonContainer>
        </FlexContainer>
        <Text size={1.4} color={COLOR.DARK}>
          {writtenTime}
        </Text>
        <StyledViewerWrapper>
          <Viewer ref={viewerRef} initialValue={body || ''} />
        </StyledViewerWrapper>
        <Tag tagList={tagList} />
        <Divider color={COLOR.GRAY} height={0.05} size={4} />
        <Textarea
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

const StyledLikeButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  position: fixed;
  right: 4rem;
  bottom: 4rem;
  z-index: 2000;

  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  background-color: ${COLOR.WHITE};
  box-shadow: 0.5rem 1rem 0.5rem rgba(0, 0, 0, 0.25);
`;
