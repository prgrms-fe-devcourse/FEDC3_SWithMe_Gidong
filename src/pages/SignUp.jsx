import styled from '@emotion/styled';
import { COLOR } from '../styles/color';

function SignUp() {
  return (
    <StyledPageWrapper>
      <StyledSignUpContainer>
        <SignUpHeader>회원가입</SignUpHeader>
        <SignUpInputForm>
          <StyledSignUpInputsContainer>
            <SignUpInputTitle>이름</SignUpInputTitle>
            <SignUpInput type='text' placeholder='머쓱' required />
            <SignUpInputDivider />
            <SignUpInputTitle>이메일</SignUpInputTitle>
            <SignUpInput type='email' placeholder='beolsae@grepp.corp' required />
            <SignUpInputDivider />
            <SignUpInputTitle>비밀번호</SignUpInputTitle>
            <SignUpInput type='password' minLength='2' maxLength='20' required />
            <SignUpInputCounter>0/20</SignUpInputCounter>
            <SignUpInputDivider />
            <SignUpInputTitle>비밀번호 확인</SignUpInputTitle>
            <SignUpInput type='password' minLength='2' maxLength='20' required />
            <SignUpInputCounter>0/20</SignUpInputCounter>
          </StyledSignUpInputsContainer>
          <SignUpButton type='submit'>회원가입</SignUpButton>
        </SignUpInputForm>
      </StyledSignUpContainer>
    </StyledPageWrapper>
  );
}

export default SignUp;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
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
`;

const SignUpInputForm = styled.form`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 68.2rem;
  height: 100%;
`;

const StyledSignUpInputsContainer = styled.div`
  display: grid;
  width: 68.2rem;
  height: 70.1rem;
  padding: 8rem 5.7rem;
  border: 0.1rem solid ${COLOR.BLACK};
`;

const SignUpInputDivider = styled.div`
  width: 100%;
  height: 5.6rem;
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

const SignUpButton = styled.button`
  width: 15.7rem;
  height: 5.2rem;
  font-size: 2.4rem;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.SIGNUP_BUTTON_BG};
`;
