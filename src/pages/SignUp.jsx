import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import Text from '@/components/base/Text';
import Button from '@/components/base/Button';
import Spinner from '@/components/base/Spinner';
import { postUserSignUp } from '@/api/signup';

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

  useEffect(() => {
    setFullNameAlert('');
  }, [inputRef?.current[0]?.value]);
  useEffect(() => {
    setEmailAlert('');
  }, [inputRef?.current[1]?.value]);
  useEffect(() => {
    setPasswordAlert('');
    setConfirmPasswordAlert('');
  }, [inputRef?.current[2]?.value]);
  useEffect(() => {
    setConfirmPasswordAlert('');
  }, [inputRef?.current[3]?.value]);

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
            <StyledSignUpInputContainer>
              <Text paragraph size={1.5} strong>
                이름
              </Text>
              <StyledSignUpInput
                type='text'
                value={fullName}
                ref={(el) => (inputRef.current[0] = el)}
                placeholder='스윗미'
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              <Text paragraph size={1.5} color={COLOR.RED}>
                {fullNameAlert}
              </Text>
            </StyledSignUpInputContainer>
            <StyledSignUpInputContainer>
              <Text paragraph size={1.5} strong>
                이메일
              </Text>
              <StyledSignUpInput
                type='email'
                value={email}
                ref={(el) => (inputRef.current[1] = el)}
                placeholder='study@with.me'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text paragraph size={1.5} color={COLOR.RED}>
                {emailAlert}
              </Text>
            </StyledSignUpInputContainer>
            <StyledSignUpInputContainer>
              <Text paragraph size={1.5} strong>
                비밀번호
              </Text>
              <StyledSignUpInput
                type='password'
                value={password}
                ref={(el) => (inputRef.current[2] = el)}
                minLength='2'
                maxLength='20'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text paragraph size={1.5} color={COLOR.SIGNUP_INPUT_COUNTER} align='right'>
                {password.length}/20
              </Text>
              <Text paragraph size={1.5} color={COLOR.RED}>
                {passwordAlert}
              </Text>
            </StyledSignUpInputContainer>
            <StyledSignUpInputContainer>
              <Text paragraph size={1.5} strong>
                비밀번호 확인
              </Text>
              <StyledSignUpInput
                type='password'
                value={confirmPassword}
                ref={(el) => (inputRef.current[3] = el)}
                minLength='2'
                maxLength='20'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Text paragraph size={1.5} color={COLOR.SIGNUP_INPUT_COUNTER} align='right'>
                {confirmPassword.length}/20
              </Text>
              <Text paragraph size={1.5} color={COLOR.RED}>
                {confirmPasswordAlert}
              </Text>
            </StyledSignUpInputContainer>
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

const StyledSignUpInputContainer = styled.div`
  width: 56.8rem;
  height: 9.6rem;
`;

const StyledSignUpInput = styled.input`
  width: 56.8rem;
  height: 7.3rem;
  font-size: 3.3rem;
  font-weight: bold;
  border-bottom: 0.1rem solid ${COLOR.BLACK};
`;
