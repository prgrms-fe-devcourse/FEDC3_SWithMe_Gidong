import { postUserAvatar, putUserFullName, putUserPassword } from '@/api/userInfo';

import { imgMypage } from '@/assets/images';

import { Avatar, Button, Input, Text } from '@/components/base';

import { useAuthContext } from '@/context/AuthProvider';

import useToasts from '@/hooks/useToasts';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const TOGGLE_PASSWORD_BLIND_TYPES = {
  PASSWORD: 'password',
  TEXT: 'text',
};

const CONFIRM_MESSAGES = {
  CONFIRM_FULLNAME: '정말로 닉네임을 바꾸시겠습니까?',
  CONFIRM_PASSWORD: '정말로 비밀번호를 바꾸시겠습니까?',
};

const ALERT_MESSEAGES = {
  CONFIRMED_FULLNAME: '닉네임이 변경되었습니다.',
  CONFIRMED_PASSWORD: '비밀번호가 변경되었습니다.',
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
  const { addToast } = useToasts();

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
      addToast(ALERT_MESSEAGES.CONFIRMED_FULLNAME);

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

    if (await putUserPassword(data)) {
      addToast(ALERT_MESSEAGES.CONFIRMED_PASSWORD);
      return;
    }

    return;
  };

  return (
    <StyledPageWrapper>
      <StyledHeader>
        <StyledProfile>
          <label htmlFor='upload'>
            <Avatar src={values.image} size='large' />
          </label>
          <input id='upload' type='file' accept='image/*' onChange={(e) => onClickEditAvatar(e.target.files[0])} />
        </StyledProfile>
        <img src={imgMypage} alt='' />
      </StyledHeader>
      <StyledMyInfoBox>
        <StyledMyInfoItem>
          <Text block size='xLarge'>
            이메일
          </Text>
          <Input value={values.email} block readonly />
        </StyledMyInfoItem>
        <StyledMyInfoItem>
          <Text block size='xLarge'>
            이름
          </Text>
          <StyledInputBox>
            <StyledUserInfoInput
              type='text'
              placeholder='이름 수정'
              value={values.fullName}
              onChange={(e) => setValues({ ...values, fullName: e.target.value })}
            />
            <Button version='primary' shape='round' fontSize='large' size='small' onClick={onClickEditFullName}>
              수정
            </Button>
          </StyledInputBox>
        </StyledMyInfoItem>
        <StyledMyInfoItem>
          <Text block size='xLarge'>
            비밀번호
          </Text>
          <StyledInputBox>
            <StyledUserInfoInput
              type={passwordInputType}
              placeholder='수정할 비밀번호를 입력해 주세요.'
              minLength='2'
              maxLength='20'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <Button version='primary' shape='round' fontSize='large' size='small' onClick={togglePasswordBlind}>
              보기
            </Button>
            <Button version='primary' shape='round' fontSize='large' size='small' onClick={onClickEditPassword}>
              수정
            </Button>
          </StyledInputBox>
        </StyledMyInfoItem>
      </StyledMyInfoBox>
    </StyledPageWrapper>
  );
}

export default MyPage;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;

  width: 100%;
  min-height: 43rem;
  padding-top: 11rem;
  background: linear-gradient(135deg, ${COLOR.MYPAGE_BG_GRADIENT_LEFT} 0%, ${COLOR.MYPAGE_BG_GRADIENT_RIGHT} 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};
  overflow: hidden;

  & > img {
    position: absolute;
    bottom: -2rem;
    right: -5rem;
    width: 45rem;
    transform: rotate(-10deg);
  }
`;

const StyledProfile = styled.div`
  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    cursor: pointer;
  }

  & > input {
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
  }
`;

const StyledMyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.WHITE};

  & > div {
    width: 45rem;
  }
`;

const StyledUserInfoInput = styled.input`
  width: 40rem;
  height: 4rem;
  font-size: 3.2rem;
  border-bottom: 0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
`;

const StyledMyInfoItem = styled.div`
  width: 100%;
  padding: 2rem 0;

  & input {
    font-weight: 100;
    font-size: 1.6rem;
    color: ${COLOR.DARK};
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  & > input {
    flex: 1 1 50%;
  }

  & > button {
    flex: 0 1 calc(25% - 1rem);
  }
`;
