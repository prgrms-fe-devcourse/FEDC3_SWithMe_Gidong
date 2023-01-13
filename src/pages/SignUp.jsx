import { postUserSignUp } from '@/api/userSign';
import { Button, Spinner, Text } from '@/components/base';
import SignInput from '@/components/domain/SignInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const ERRORS = {
  FULLNAME_EMPTY_ERROR: '이름을 입력해 주세요',
  EMAIL_EMPTY_ERROR: '이메일을 입력해 주세요',
  PASSWORD_EMPTY_ERROR: '비밀번호를 입력해 주세요',
  CONFIRMPASSWORD_EMPTY_ERROR: '비밀번호 확인을 입력해 주세요',
  FULLNAME_MIN_LENGTH_ERROR: '이름을 2글자 이상 입력해주세요.',
  EMAIL_VALIDATE_ERROR: '이메일 형식이 올바르지 않습니다.',
  PASSWORD_MIN_LENGTH_ERROR: '비밀번호를 2글자 이상 20글자 이하로 입력해주세요.',
  PASSWORD_DIFFERENT_ERROR: '비밀번호가 서로 다릅니다.',
};

const MAGIC_NUMBERS = {
  FULLNAME_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 2,
};

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameAlert, setFullNameAlert] = useState('');
  const [emailAlert, setEmailAlert] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef([]);

  const handleSignUp = async () => {
    if (!fullName) return setFullNameAlert(ERRORS.FULLNAME_EMPTY_ERROR);
    if (fullName.length < MAGIC_NUMBERS.FULLNAME_MIN_LENGTH) return setFullNameAlert(ERRORS.FULLNAME_MIN_LENGTH_ERROR);
    if (!email) return setEmailAlert(ERRORS.EMAIL_EMPTY_ERROR);
    if (!/^.+@.+\..+$/.test(email)) return setEmailAlert(ERRORS.EMAIL_VALIDATE_ERROR);
    if (!password) return setPasswordAlert(ERRORS.PASSWORD_EMPTY_ERROR);
    if (password.length < MAGIC_NUMBERS.PASSWORD_MIN_LENGTH) return setPasswordAlert(ERRORS.PASSWORD_MIN_LENGTH_ERROR);
    if (!confirmPassword) return setConfirmPasswordAlert(ERRORS.CONFIRMPASSWORD_EMPTY_ERROR);
    if (password !== confirmPassword) return setConfirmPasswordAlert(ERRORS.PASSWORD_DIFFERENT_ERROR);

    const requestBody = {
      email,
      fullName,
      password,
    };

    setIsLoading(true);
    await postUserSignUp(requestBody);

    alert('회원가입이 완료 되었습니다.');
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
        <StyledSignUpContainer>
          <Text paragraph size={3.3} strong>
            회원가입
          </Text>
          <StyledSignUpForm onKeyDown={onClickEnter}>
            <SignInput
              header={'이름'}
              inputType={'text'}
              inputValue={fullName}
              inputRef={inputRef.current[0]}
              inputPlaceholder={'스윗미'}
              inputOnChange={setFullName}
              alert={fullNameAlert}
              alertOnChange={setFullNameAlert}
            />
            <SignInput
              header={'이메일'}
              inputType={'email'}
              inputValue={email}
              inputRef={inputRef.current[1]}
              inputPlaceholder={'study@with.me'}
              inputOnChange={setEmail}
              alert={emailAlert}
              alertOnChange={setEmailAlert}
            />
            <SignInput
              header={'비밀번호'}
              inputType={'password'}
              inputValue={password}
              inputRef={inputRef.current[2]}
              inputPlaceholder={''}
              inputMin={'2'}
              inputMax={'20'}
              inputOnChange={setPassword}
              alert={passwordAlert}
              alertOnChange={setPasswordAlert}
              isSignupInput={true}
            />
            <SignInput
              header={'비밀번호 확인'}
              inputType={'password'}
              inputValue={confirmPassword}
              inputRef={inputRef.current[3]}
              inputPlaceholder={''}
              inputMin={'2'}
              inputMax={'20'}
              inputOnChange={setConfirmPassword}
              alert={confirmPasswordAlert}
              alertOnChange={setConfirmPasswordAlert}
              isSignupInput={true}
            />
          </StyledSignUpForm>
          <Button
            as='button'
            style={{ fontSize: '2.4rem', width: '15.7rem', height: '5.2rem' }}
            color={COLOR.WHITE}
            bgcolor={COLOR.SIGNUP_BUTTON_BG}
            onClick={handleSignUp}>
            회원가입
          </Button>
        </StyledSignUpContainer>
      </StyledPageWrapper>
    </>
  );
}

export default SignUp;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12.6rem;
  width: 100%;
  height: 100%;
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

const StyledSignUpContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 68.2rem;
  height: 100%;
`;

const StyledSignUpForm = styled.div`
  display: grid;
  width: 68.2rem;
  height: 70.1rem;
  margin: 5.6rem 0;
  padding: 8rem 5.7rem;
  border: 0.1rem solid ${COLOR.BLACK};
`;
