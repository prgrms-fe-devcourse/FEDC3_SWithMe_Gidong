import { postUserSignIn } from '@/api/userSign';
import { Button, Spinner, Text } from '@/components/base';
import SignInput from '@/components/domain/SignInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const ERRORS = {
  EMAIL_EMPTY_ERROR: '이메일을 입력해 주세요',
  PASSWORD_EMPTY_ERROR: '비밀번호를 입력해 주세요',
  EMAIL_VALIDATE_ERROR: '이메일 형식이 올바르지 않습니다.',
  LOGIN_USER_FAIL_ERROR: '이메일 또는 비밀번호가 틀립니다.',
};

const INPUT_NUMBER_LIMIT = {
  MIN: 2,
  MAX: 20,
};

function SignIn() {
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
    await postUserSignIn(requestBody);

    alert('로그인');
    setIsLoading(false);
  };

  const onClickEnter = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  return (
    <>
      {isLoading ? (
        <StyledSpinnerWrapper>
          <Spinner size={64} />
        </StyledSpinnerWrapper>
      ) : null}
      <StyledPageWrapper>
        <StyledSignInContainer>
          <Text paragraph size={3.3} strong>
            로그인
          </Text>
          <StyledSignInForm onKeyDown={onClickEnter}>
            <SignInput
              header={'이메일'}
              type={'email'}
              value={email}
              ref={inputRef.current[0]}
              placeholder={'study@with.me'}
              inputOnChange={setEmail}
              alert={emailAlert}
              alertOnChange={setEmailAlert}
            />
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
          </StyledSignInForm>
          <StyledSignUpNav>
            <Text paragraph size={1.5}>
              계정이 없으신가요?
            </Text>
            <Text paragraph size={1.5} color={COLOR.SIGNIN_SIGNUP_FONT}>
              회원가입
            </Text>
          </StyledSignUpNav>
          <Button
            as='button'
            style={{ fontSize: '2.4rem', width: '15.7rem', height: '5.2rem' }}
            color={COLOR.WHITE}
            bgcolor={COLOR.SIGNUP_BUTTON_BG}
            onClick={handleSignUp}>
            로그인
          </Button>
        </StyledSignInContainer>
      </StyledPageWrapper>
    </>
  );
}

export default SignIn;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
  width: 100%;
  height: 80%;
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

const StyledSignInContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 68.2rem;
  height: 100%;
`;

const StyledSignInForm = styled.div`
  display: grid;
  gap: 5.5rem;
  width: 68.2rem;
  height: 38.2rem;
  padding: 6.5rem 5.7rem;
  border: 0.1rem solid ${COLOR.BLACK};
`;

const StyledSignUpNav = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;
