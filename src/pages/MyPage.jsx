import { postUserAvatar, putUserFullName, putUserPassword } from '@/api/userInfo';
import { imgMypage } from '@/assets/images';
import Avatar from '@/components/base/Avatar';
import MyPageButton from '@/components/domain/MyPageButton';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOGGLE_PASSWORD_BLIND_TYPES = {
  PASSWORD: 'password',
  TEXT: 'text',
};

const CONFIRM_MESSAGES = {
  CONFIRM_FULLNAME: '정말로 닉네임을 바꾸시겠습니까?',
  CONFIRM_PASSWORD: '정말로 비밀번호를 바꾸시겠습니까?',
  CONFIRMED: '반영되었습니다.',
};

const INPUT_NUMBER_LIMIT = {
  MIN: 2,
  MAX: 20,
};

function MyPage() {
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn, loggedUser },
    onReload,
  } = useAuthContext();

  if (!isLoggedIn) navigate('/');

  const [values, setValues] = useState({
    image: '',
    fullName: '',
    email: '',
    password: '',
  });

  const [passwordInputType, setPasswordInputType] = useState(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);

  useEffect(() => {
    setValues({
      ...values,
      image: loggedUser.image,
      fullName: loggedUser.fullName,
      email: loggedUser.email,
    });
  }, []);

  const togglePasswordBlind = () => {
    if (passwordInputType === TOGGLE_PASSWORD_BLIND_TYPES.TEXT) {
      return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.PASSWORD);
    }

    return setPasswordInputType(TOGGLE_PASSWORD_BLIND_TYPES.TEXT);
  };

  const onClickEditAvatar = async (image) => {
    const formData = new FormData();
    formData.append('isCover', false);
    formData.append('image', image);

    const response = await postUserAvatar(formData);

    if (response) {
      setValues({ ...values, image: response.image });
      onReload(response);
      alert(CONFIRM_MESSAGES.CONFIRMED);

      return;
    }

    return;
  };

  const onClickEditFullName = async () => {
    if (!values.fullName) return;
    if (!confirm(CONFIRM_MESSAGES.CONFIRM_FULLNAME)) return;

    const data = {
      fullName: values.fullName,
      username: values.fullName,
    };
    const response = await putUserFullName(data);

    if (response) {
      setValues({ ...values, fullName: response.fullName });
      onReload(response);
      alert(CONFIRM_MESSAGES.CONFIRMED);

      return;
    }

    return;
  };

  const onClickEditPassword = async () => {
    if (!values.password) return;
    if (values.password.length < INPUT_NUMBER_LIMIT.MIN) return;
    if (values.password.length > INPUT_NUMBER_LIMIT.MAX) return;
    if (!confirm(CONFIRM_MESSAGES.CONFIRM_PASSWORD)) return;

    const data = {
      password: values.password,
    };

    if (await putUserPassword(data)) return alert(CONFIRM_MESSAGES.CONFIRMED);

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
            <Avatar src={values.image} size={'27.5'} shape={'circle'} />
          </label>
          <input
            id='upload'
            type='file'
            accept='image/*'
            style={{ position: 'absolute', width: '0.1rem', height: '0.1rem' }}
            onChange={(e) => onClickEditAvatar(e.target.files[0])}
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
        <StyledUserInfoWrapper>
          <StyledUserInfoInput
            type='text'
            placeholder='닉네임 수정'
            value={values.fullName}
            onChange={(e) => setValues({ ...values, fullName: e.target.value })}
          />
          <MyPageButton content={'수정하기'} onClick={onClickEditFullName} />
        </StyledUserInfoWrapper>
        <StyledUserInfoInput type='text' value={values.email} readOnly style={{ width: '72rem' }} />
        <StyledUserInfoWrapper>
          <StyledUserInfoInput
            type={passwordInputType}
            placeholder='비밀번호 수정'
            minLength='2'
            maxLength='20'
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            style={{ fontSize: '2rem' }}
          />
          <MyPageButton content={'비밀번호 보기'} onClick={togglePasswordBlind} />
          <MyPageButton content={'수정하기'} onClick={onClickEditPassword} />
        </StyledUserInfoWrapper>
      </StyledUserInfoContainer>
    </StyledPageWrapper>
  );
}

export default MyPage;

const StyledPageWrapper = styled.div`
  position: relative;
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

const StyledUserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 72rem;
  height: 5rem;
  padding: 0;
`;

const StyledUserInfoInput = styled.input`
  width: 40rem;
  height: 4rem;
  font-size: 3.2rem;
`;
