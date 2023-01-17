import { imgMypage, imgUserAvatar } from '@/assets/images';
import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { getItem } from '@/utils/storage';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
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
    fullName: '스윗미',
    email: 'study@with.me',
    password: 'password',
  });

  const [passwordInputType, setPasswordInputType] = useState(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);

  // 처음 렌더링시 사용자 데이터 불러오기
  useEffect(() => {
    /**
     * 특정 사용자 정보 불러오기
     * GET /users/{userId}
     */
  }, []);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setValues({ ...values, image: reader.result });
        resolve();
      };
    });
  };

  const togglePasswordBlind = () => {
    if (passwordInputType === TOGGLE_PASSWORD_BLIND_TYPES.TEXT) {
      return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);
    }

    return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.TEXT);
  };

  const onClickEdit = () => {
    if (!confirm('수정하시겠습니까?')) return;
    alert('수정되었습니다!');
    /**
     * API
     * 이미지 변경
     * POST /users/upload-photo
     * Authorization: bearer JWT토큰
     * isCover: false
     * image: Binary
     *
     * 이름 변경
     * PUT /settings/update-user
     * Authorization: bearer JWT토큰
     *
     * 비밀번호 변경
     * PUT /settings/update-password
     * Authorization: bearer JWT토큰
     * "password": String
     */
    return;
  };

  return (
    <StyledPageWrapper>
      <StyledBanner>
        <div>
          <label
            htmlFor='upload'
            style={{
              display: 'inline-block',
              width: '27.5rem',
              height: '27.5rem',
            }}>
            <img
              src={values.image}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </label>
          <input
            id='upload'
            type='file'
            accept='image/*'
            style={{ position: 'absolute', width: '0.1rem', height: '0.1rem' }}
            onChange={(e) => encodeFileToBase64(e.target.files[0])}
          />
        </div>
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
        <input
          type='text'
          defaultValue={values.fullName}
          onChange={(e) => setValues({ ...values, fullName: e.target.value })}
          style={{
            fontSize: '3.2rem',
            textAlign: 'center',
          }}
        />
        <Text size={3.2}>{values.email}</Text>
        <div style={{ display: 'grid' }}>
          <Button
            onClick={togglePasswordBlind}
            style={{
              backgroundColor: 'transparent',
            }}>
            <Text size={2} underline>
              비밀번호 보기
            </Text>
          </Button>
          <input
            type={passwordInputType}
            placeholder={'password'}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            style={{
              fontSize: '2rem',
              textAlign: 'center',
            }}
          />
        </div>
        <Button
          onClick={onClickEdit}
          style={{
            width: '8.1rem',
            height: '3.7rem',
            borderRadius: '0.5rem',
            fontSize: '2.4rem',
            color: COLOR.WHITE,
            backgroundColor: COLOR.MYPAGE_SUBMIT_BUTTON_BG,
          }}>
          수정
        </Button>
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
  height: 50.2rem;
  top: 0;
  border-radius: 0 0 24rem 4rem;
  background: linear-gradient(135deg, ${COLOR.MYPAGE_BG_GRADIENT_LEFT}, ${COLOR.MYPAGE_BG_GRADIENT_RIGHT});
`;

const StyledUserInfoContainer = styled.div`
  display: grid;
  gap: 3rem;
  place-items: center;
  text-align: center;
  margin-top: 5rem;
  width: 100%;
`;
