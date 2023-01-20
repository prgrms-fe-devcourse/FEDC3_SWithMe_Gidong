import { Spinner, Header, Text, Image, Button } from '@/components/base';
import SignInput from '@/components/domain/SignInput';
import { useUserContext } from '@/context/UserProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imgLogin } from '@/assets/images';
import { css } from '@emotion/react';

const ERRORS = {
  FULLNAME_EMPTY_ERROR: '이름을 입력해 주세요.',
  EMAIL_EMPTY_ERROR: '이메일을 입력해 주세요.',
  PASSWORD_EMPTY_ERROR: '비밀번호를 입력해 주세요.',
  CONFIRMPASSWORD_EMPTY_ERROR: '비밀번호 확인을 입력해 주세요.',
  FULLNAME_MIN_LENGTH_ERROR: '이름을 2글자 이상 입력해주세요.',
  EMAIL_VALIDATE_ERROR: '이메일 형식이 올바르지 않습니다.',
  PASSWORD_MIN_LENGTH_ERROR: '비밀번호를 2글자 이상 20글자 이하로 입력해주세요.',
  PASSWORD_DIFFERENT_ERROR: '비밀번호가 서로 다릅니다.',
};

const MAGIC_NUMBERS = {
  FULLNAME_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 2,
};

const INPUT_NUMBER_LIMIT = {
  MIN: 2,
  MAX: 20,
};

function SignUp() {
  const navigate = useNavigate();
  const { onCreateUser } = useUserContext();

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
    await onCreateUser(requestBody);

    // alert('회원가입이 완료 되었습니다.');
    setIsLoading(false);

    navigate('/signIn');
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
        <StyledSignUpBox onKeyDown={onClickEnter}>
          <Header level={3} size={25}>
            회원가입
          </Header>
          <StyledDesc>
            <div>
              <Text paragraph color={COLOR.DARK} size={2.1} weight={500}>
                <Text color={COLOR.TAG_COLOR[0]}>회원가입</Text>하여 <Text color={COLOR.TAG_COLOR[1]}>스윗미</Text>의
                서비스를 즐겨보세요.
              </Text>
            </div>
            <Image src={imgLogin} width={20} />
          </StyledDesc>
          <StyledSignUpItem>
            <SignInput
              header={'이름'}
              type={'text'}
              value={fullName}
              ref={inputRef.current[0]}
              placeholder={'이름을 입력해 주세요.'}
              inputOnChange={setFullName}
              alert={fullNameAlert}
              alertOnChange={setFullNameAlert}
            />
          </StyledSignUpItem>
          <StyledSignUpItem>
            <SignInput
              header={'이메일'}
              type={'email'}
              value={email}
              ref={inputRef.current[1]}
              placeholder={'이메일을 입력해 주세요.'}
              inputOnChange={setEmail}
              alert={emailAlert}
              alertOnChange={setEmailAlert}
            />
          </StyledSignUpItem>
          <StyledSignUpItem>
            <SignInput
              header={'비밀번호'}
              type={'password'}
              value={password}
              ref={inputRef.current[2]}
              placeholder={''}
              minLength={INPUT_NUMBER_LIMIT.MIN}
              maxLength={INPUT_NUMBER_LIMIT.MAX}
              inputOnChange={setPassword}
              alert={passwordAlert}
              alertOnChange={setPasswordAlert}
              isSignupInput={true}
            />
          </StyledSignUpItem>
          <StyledSignUpItem>
            <SignInput
              header={'비밀번호 확인'}
              type={'password'}
              value={confirmPassword}
              ref={inputRef.current[3]}
              placeholder={''}
              minLength={INPUT_NUMBER_LIMIT.MIN}
              maxLength={INPUT_NUMBER_LIMIT.MAX}
              inputOnChange={setConfirmPassword}
              alert={confirmPasswordAlert}
              alertOnChange={setConfirmPasswordAlert}
              isSignupInput={true}
            />
          </StyledSignUpItem>
          <StyledButton onClick={handleSignUp}>회원가입</StyledButton>
        </StyledSignUpBox>
      </StyledContainer>
    </StyledPageWrapper>
  );
}

export default SignUp;

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

const StyledSignUpBox = styled.div`
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

const StyledSignUpItem = styled.div`
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
