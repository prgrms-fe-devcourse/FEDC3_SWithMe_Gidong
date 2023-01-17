import { imgMypage, imgUserAvatar } from '@/assets/images';
import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { getItem } from '@/utils/storage';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOGGLE_PASSWORD_BLIND_TYPES = {
  PASSWORD: 'password',
  TEXT: 'text',
};

function MyPage() {
  const navigate = useNavigate();

  if (!getItem('token')) navigate('/');

  const [values, setValues] = useState({
    image: imgUserAvatar,
    fullName: '닉네임 표시',
    email: '이메일 표시',
    password: '비밀번호 표시',
  });

  const [passwordInputValue, setPasswordInputValue] = useState('1234');
  const [passwordInputType, setPasswordInputType] = useState(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);

  const togglePasswordBlind = () => {
    if (passwordInputType === TOGGLE_PASSWORD_BLIND_TYPES.TEXT) {
      return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);
    }

    return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.TEXT);
  };

  return (
    <StyledPageWrapper>
      <StyledBanner>
        <img src={values.image} style={{ width: '27.5rem', height: '27.5rem' }} />
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
        <Text size={3.2}>{values.fullName}</Text>
        <Text size={3.2}>{values.email}</Text>
        <div style={{ display: 'grid' }}>
          <Button onClick={togglePasswordBlind}>
            <Text size={2}>비밀번호 보기</Text>
          </Button>
          <input
            type={passwordInputType}
            value={passwordInputValue}
            size={2}
            onChange={(e) => setPasswordInputValue(e.target.value)}
          />
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
