import { imgMypage, imgUserAvatar } from '@/assets/images';
import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function MyPage() {
  return (
    <StyledPageWrapper>
      <StyledBanner>
        <img src={imgUserAvatar} style={{ width: '27.5rem', height: '27.5rem' }} />
        <img
          src={imgMypage}
          style={{
            position: 'absolute',
            width: '55.6rem',
            height: '35.2rem',
            bottom: '-0.8rem',
            right: '-0.8rem',
            transform: 'rotate(-9.84deg)',
          }}
        />
      </StyledBanner>
      <StyledUserInfoContainer>
        <Text size={3.2}>김이름</Text>
        <Text size={3.2}>study@with.me</Text>
        <div style={{ display: 'grid' }}>
          <Text size={2}>비밀번호 보기</Text>
          <Text size={2}>************</Text>
        </div>
        <Button>수정</Button>
      </StyledUserInfoContainer>
    </StyledPageWrapper>
  );
}

export default MyPage;

const StyledPageWrapper = styled.div`
  position: relative
  width: 100%;
  height: 100%;
`;

const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 42.2rem;
  margin-top: 8rem;
  top: 0;
  border-radius: 0 0 24rem 4rem;
  background: linear-gradient(135deg, ${COLOR.MYPAGE_BG_GRADIENT_LEFT}, ${COLOR.MYPAGE_BG_GRADIENT_RIGHT});
`;

const StyledUserInfoContainer = styled.div`
  display: grid;
  gap: 3rem;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-top: 5rem;
  width: 100%;
`;
