import styled from '@emotion/styled';
import { COLOR } from '../styles/color';

function SignUp() {
  return (
    <StyledPageWrapper>
      <StyledSignUpContainer>
        <SignUpHeader>회원가입</SignUpHeader>
        <StyledSignUpInputsContainer>
          <SignUpInputForm>
            <SignInputTitle>이름</SignInputTitle>
            <SignUpInput defaultValue='머쓱' />
          </SignUpInputForm>
          <SignUpInputForm>
            <SignInputTitle>이메일</SignInputTitle>
            <SignUpInput defaultValue='beolsae@greep.co' />
          </SignUpInputForm>
          <SignUpInputForm>
            <SignInputTitle>비밀번호</SignInputTitle>
            <SignUpInput />
            <SignUpInputCounter>0/20</SignUpInputCounter>
          </SignUpInputForm>
          <SignUpInputForm>
            <SignInputTitle>비밀번호 확인</SignInputTitle>
            <SignUpInput />
            <SignUpInputCounter>0/20</SignUpInputCounter>
          </SignUpInputForm>
        </StyledSignUpInputsContainer>
        <SignUpButton>회원가입</SignUpButton>
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

const StyledSignUpInputsContainer = styled.div`
  display: grid;
  gap: 5.6rem;
  width: 68.2rem;
  height: 62.1rem;
  padding: 8rem 5.7rem;
  border: 0.1rem solid ${COLOR.BLACK};
`;

const SignUpHeader = styled.div`
  font-size: 3.3rem;
  font-weight: bold;
`;

const SignUpInputForm = styled.div`
  display: grid;
  align-items: start;
  width: 56.8rem;
  height: 8.2rem;
`;

const SignInputTitle = styled.h1`
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
  color: ${COLOR.SIGNUP_INPUT_COUNTER};
`;

const SignUpButton = styled.button`
  width: 15.7rem;
  height: 5.2rem;
  font-size: 2.4rem;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.SIGNUP_BUTTON_BG};
`;
