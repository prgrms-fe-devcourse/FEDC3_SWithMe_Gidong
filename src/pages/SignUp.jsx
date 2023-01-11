import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { COLOR } from '../styles/color';

const PASSWORD_MIN_LENGTH_ERROR = '비밀번호를 2글자 이상 20글자 이하로 입력해주세요.';
const PASSWORD_DISCARD_ERROR = '비밀번호가 서로 다릅니다.';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleOnClickSignUp = () => {
    if (password.length < 2) return setPasswordAlert(PASSWORD_MIN_LENGTH_ERROR);
    if (password !== confirmPassword) return setConfirmPasswordAlert(PASSWORD_DISCARD_ERROR);

    console.log('submit');

    /**
     * form에서 올바른 값이 확인 되었을 때
     * request
     * {
     *   "email": email,
     *   "fullName": fullName,
     *   "password": password
     * }
     */
  };

  useEffect(() => {
    setPasswordAlert('');
    setConfirmPasswordAlert('');
  }, [passwordRef?.current?.value]);
  useEffect(() => {
    setConfirmPasswordAlert('');
  }, [confirmPasswordRef?.current?.value]);

  return (
    <StyledPageWrapper>
      <StyledSignUpContainer>
        <SignUpHeader>회원가입</SignUpHeader>
        <StyledSignUpForm>
          <SignUpInputContainer>
            <SignUpInputTitle>이름</SignUpInputTitle>
            <SignUpInput
              type='text'
              value={fullName}
              ref={fullNameRef}
              placeholder='스윗미'
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </SignUpInputContainer>
          <SignUpInputContainer>
            <SignUpInputTitle>이메일</SignUpInputTitle>
            <SignUpInput
              type='email'
              value={email}
              ref={emailRef}
              placeholder='study@with.me'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </SignUpInputContainer>
          <SignUpInputContainer>
            <SignUpInputTitle>비밀번호</SignUpInputTitle>
            <SignUpInput
              type='password'
              value={password}
              ref={passwordRef}
              minLength='2'
              maxLength='20'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <SignUpInputCounter>{password.length}/20</SignUpInputCounter>
            <SignUpInputAlertText>{passwordAlert}</SignUpInputAlertText>
          </SignUpInputContainer>
          <SignUpInputContainer>
            <SignUpInputTitle>비밀번호 확인</SignUpInputTitle>
            <SignUpInput
              type='password'
              value={confirmPassword}
              ref={confirmPasswordRef}
              minLength='2'
              maxLength='20'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <SignUpInputCounter>{confirmPassword.length}/20</SignUpInputCounter>
            <SignUpInputAlertText>{confirmPasswordAlert}</SignUpInputAlertText>
          </SignUpInputContainer>
        </StyledSignUpForm>
        <SignUpButton type='submit' onClick={handleOnClickSignUp}>
          회원가입
        </SignUpButton>
      </StyledSignUpContainer>
    </StyledPageWrapper>
  );
}

export default SignUp;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
  width: 100%;
  height: 100%;
`;

const StyledSignUpContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 68.2rem;
  height: 100%;
`;

const SignUpHeader = styled.div`
  font-size: 3.3rem;
  font-weight: bold;
  margin-bottom: 5.6rem;
`;

const StyledSignUpForm = styled.div`
  display: grid;
  width: 68.2rem;
  height: 70.1rem;
  padding: 8rem 5.7rem;
  border: 0.1rem solid ${COLOR.BLACK};
`;

const SignUpInputContainer = styled.div`
  width: 56.8rem;
  height: 9.6rem;
`;

const SignUpInputTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SignUpInput = styled.input`
  width: 56.8rem;
  height: 7.3rem;
  font-size: 3.3rem;
  font-weight: bold;
  border-bottom: 0.1rem solid ${COLOR.BLACK};
`;

const SignUpInputCounter = styled.h1`
  font-size: 1.5rem;
  text-align: right;
  color: ${COLOR.SIGNUP_INPUT_COUNTER};
`;

const SignUpInputAlertText = styled.h1`
  font-size: 1.5rem;
  text-align: left;
  color: ${COLOR.RED};
`;

const SignUpButton = styled.button`
  width: 15.7rem;
  height: 5.2rem;
  font-size: 2.4rem;
  margin-top: 5.6rem;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.SIGNUP_BUTTON_BG};
`;
