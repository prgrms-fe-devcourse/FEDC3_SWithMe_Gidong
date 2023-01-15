import { imgDefaultAvatar } from '@/assets/images';
import { Avatar, Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { convertDate } from '@/utils/date';
import styled from '@emotion/styled';

function CommentItem({ comment }) {
  const { author, comment: body, updatedAt } = comment;
  const writtenTime = convertDate(new Date(updatedAt));

  return (
    <StyledCommentItem>
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
      <Text size={1.2} color={COLOR.DARK}>
        {writtenTime}
      </Text>
      <StyledCommentWrapper>
        <Text size={1.8} color={COLOR.DARK}>
          {body}
        </Text>
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
