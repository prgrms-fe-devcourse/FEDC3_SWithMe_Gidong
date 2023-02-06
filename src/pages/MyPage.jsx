import { postUserAvatar, putUserFullName, putUserPassword } from '@/api/userInfo';
import { imgMypage, imgUserAvatar } from '@/assets/images';
import { Avatar, Input, Text } from '@/components/base';
import { MyPageButton } from '@/components/domain/MyPage';
import { useAuthContext } from '@/context/AuthProvider';
import { useToastContext } from '@/context/ToastProvider';
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
  const { addToast } = useToastContext();

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
      addToast(CONFIRM_MESSAGES.CONFIRMED);

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
      addToast(CONFIRM_MESSAGES.CONFIRMED);
      return;
    }

    return;
  };

  return (
    <StyledPageWrapper>
      <StyledHeader>
        <StyledProfile>
          <label htmlFor='upload'>
            <Avatar src={values.image ? values.image : imgUserAvatar} size={'23'} shape={'circle'} />
          </label>
          <input id='upload' type='file' accept='image/*' onChange={(e) => onClickEditAvatar(e.target.files[0])} />
        </StyledProfile>
        <img src={imgMypage} alt='' />
      </StyledHeader>
      <StyledMyInfoBox>
        <StyledMyInfoItem>
          <Text block size={2}>
            이메일
          </Text>
          <Input
            type='text'
            defaultValue={values.email}
            block
            readOnly
            style={{
              borderBottom: 'none',
            }}
          />
        </StyledMyInfoItem>
        <StyledMyInfoItem>
          <Text block size={2}>
            이름
          </Text>
          <StyledInputBox>
            <StyledUserInfoInput
              type='text'
              placeholder='이름 수정'
              value={values.fullName}
              onChange={(e) => setValues({ ...values, fullName: e.target.value })}
            />
            <MyPageButton content={'수정'} onClick={onClickEditFullName} />
          </StyledInputBox>
        </StyledMyInfoItem>
        <StyledMyInfoItem>
          <Text block size={2}>
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
            <MyPageButton content={'보기'} onClick={togglePasswordBlind} />
            <MyPageButton content={'수정'} onClick={onClickEditPassword} />
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
  margin: 1rem 0 2rem 0;
  width: 40rem;
  height: 4rem;
  font-size: 3.2rem;
  border-bottom: 0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
`;

const StyledMyInfoItem = styled.div`
  width: 100%;
  padding: 2rem 0;

  & input {
    height: 3rem;
    font-weight: 100;
    font-size: 1.6rem;
    color: ${COLOR.DARK};
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  gap: 1rem;
`;
