import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect } from 'react';

function SignInput(props) {
  const {
    header,
    type,
    value,
    ref,
    placeholder,
    minLength,
    maxLength,
    inputOnChange,
    alert,
    alertOnChange,
    isSignupInput,
  } = props;

  useEffect(() => {
    alertOnChange('');
  }, [value]);

  return (
    <StyledSignInputContainer>
      <Text paragraph size={1.5} strong>
        {header}
      </Text>
      <StyledSignInput
        type={type}
        value={value}
        ref={ref}
        placeholder={placeholder}
        required
        minLength={minLength}
        maxLength={maxLength}
        onChange={(e) => inputOnChange(e.target.value)}
      />
      {isSignupInput ? (
        <Text paragraph size={1.5} color={COLOR.SIGNUP_INPUT_COUNTER} align='right'>
          {value.length}/20
        </Text>
      ) : null}
      <Text paragraph size={1.5} color={COLOR.RED}>
        {alert}
      </Text>
    </StyledSignInputContainer>
  );
}

export default SignInput;

const StyledSignInputContainer = styled.div`
  width: 56.8rem;
  height: 9.6rem;
`;

const StyledSignInput = styled.input`
  width: 56.8rem;
  height: 7.3rem;
  font-size: 3.3rem;
  font-weight: bold;
  border-bottom: 0.1rem solid ${COLOR.BLACK};
`;