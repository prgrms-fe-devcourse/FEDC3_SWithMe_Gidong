import { postUserSignIn } from '@/api/userSign';
import { imgLogin } from '@/assets/images';
import { Button, Header, Image, Spinner, Text } from '@/components/base';
import SignInput from '@/components/domain/SignInput';
import { useAuthContext } from '@/context/AuthProvider';
import { useToastContext } from '@/context/ToastProvider';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ERRORS = {
  EMAIL_EMPTY_ERROR: '이메일을 입력해 주세요.',
  PASSWORD_EMPTY_ERROR: '비밀번호를 입력해 주세요.',
  EMAIL_VALIDATE_ERROR: '이메일 형식이 올바르지 않습니다.',
  LOGIN_USER_FAIL_ERROR: '이메일 또는 비밀번호가 틀립니다.',
};

const INPUT_NUMBER_LIMIT = {
  MIN: 2,
  MAX: 20,
};

function SignIn() {
  const navigate = useNavigate();
  const { onLogin } = useAuthContext();
  const { addToast } = useToastContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef([]);

  const handleSignUp = async () => {
    if (!email) return setEmailAlert(ERRORS.EMAIL_EMPTY_ERROR);
    if (!/^.+@.+\..+$/.test(email)) return setEmailAlert(ERRORS.EMAIL_VALIDATE_ERROR);
    if (!password) return setPasswordAlert(ERRORS.PASSWORD_EMPTY_ERROR);

    const requestBody = {
      email,
      password,
    };

    setIsLoading(true);
    const data = await postUserSignIn(requestBody);
    setIsLoading(false);

    if (data.isFailed) {
      addToast(data.errorMessage);
      return;
    }
    onLogin(data);
    navigate('/');
  };

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  if (isLoading) {
    return (
      <StyledSpinnerWrapper>
        <Spinner size={64} />
      </StyledSpinnerWrapper>
    );
  }

  return (
    <StyledPageWrapper>
      <StyledContainer>
        <StyledLoginBox onKeyDown={onClickEnter}>
          <Header level={3} size={25}>
            로그인
          </Header>
          <StyledDesc>
            <div>
              <Text paragraph color={COLOR.DARK} size={2.1} weight={500}>
                <Text color={COLOR.TAG_COLOR[0]}>로그인</Text>하여 <Text color={COLOR.TAG_COLOR[1]}>스윗미</Text>의
                서비스를 즐겨보세요.
              </Text>
            </div>
            <Image src={imgLogin} width={20} />
          </StyledDesc>
          <StyledLoginItem>
            <SignInput
              header={'이메일'}
              type={'email'}
              value={email}
              ref={inputRef.current[0]}
              placeholder={'이메일을 입력해 주세요.'}
              inputOnChange={setEmail}
              alert={emailAlert}
              alertOnChange={setEmailAlert}
            />
          </StyledLoginItem>
          <StyledLoginItem isLastItem={true}>
            <SignInput
              header={'비밀번호'}
              type={'password'}
              value={password}
              ref={inputRef.current[1]}
              minLength={INPUT_NUMBER_LIMIT.MIN}
              maxLength={INPUT_NUMBER_LIMIT.MAX}
              placeholder={''}
              inputOnChange={setPassword}
              alert={passwordAlert}
              alertOnChange={setPasswordAlert}
            />
          </StyledLoginItem>
          <StyledSignUpNav>
            <Text paragraph style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
              계정이 없으신가요?
            </Text>
            <Button
              bgcolor={COLOR.HEADER_TRANSPARENT_BG}
              color={COLOR.SIGNIN_SIGNUP_FONT}
              style={{ fontSize: '1.5rem', padding: '0' }}
              onClick={() => navigate('/signUp')}>
              회원가입
            </Button>
          </StyledSignUpNav>
          <StyledButton onClick={handleSignUp}>로그인</StyledButton>
        </StyledLoginBox>
      </StyledContainer>
    </StyledPageWrapper>
  );
}

export default SignIn;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  flex: 1;

  position: relative;
  padding: 10rem;
  background-color: ${COLOR.MY_GROUP_BG};
`;

const StyledLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.WHITE};

  & > h3 {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${COLOR.GRAY_10};
  }

  & > div:not(:nth-of-type(1)) {
    width: 45rem;
  }
`;

const StyledDesc = styled.div`
  display: flex;
  justify-content: space-between;

  height: 15rem;
  margin: 3rem 0;
  padding: 0 3rem;
  border-radius: 1rem;
  background-color: ${COLOR.MY_GROUP_BOX_BG};

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 0.5rem 0;
    }
  }
`;

const StyledLoginItem = styled.div`
  width: 100%;
  padding: 2rem 0;

  & input {
    height: 3rem;
    font-weight: 100;
    font-size: 1.6rem;
    color: ${COLOR.DARK};
  }

  ${({ isLastItem }) =>
    isLastItem &&
    css`
      padding-bottom: 0;
    `};
`;

const StyledButton = styled.button`
  width: 10rem;
  padding: 1rem;
  border-radius: 0.6rem;

  background-color: ${COLOR.PRIMARY_BTN};
  text-align: center;
  font-size: 1.8rem;
  color: ${COLOR.WHITE};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const StyledSpinnerWrapper = styled.div`
  position: fixed;
  display: grid;
  justify-content: center;
  align-content: center;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.SIGNUP_SPINNER_BG};
`;

const StyledSignUpNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-bottom: 4rem;
`;
