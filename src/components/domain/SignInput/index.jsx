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
      <Text block size={2}>
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
        <StyledLengthLabel>
          <Text size={1.2} weight={300}>
            {value.length}/20
          </Text>
        </StyledLengthLabel>
      ) : null}
      <StyledLabel>
        <Text paragraph size={1.2} color={COLOR.RED}>
          {alert}
        </Text>
      </StyledLabel>
    </StyledSignInputContainer>
  );
}

export default SignInput;

const StyledSignInputContainer = styled.div`
  position: relative;
  display: block;
`;

const StyledSignInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
  box-sizing: border-box;
  margin: 1rem 0 2rem 0;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: 0.3em;
  background-color: transparent;
`;

const StyledLengthLabel = styled(StyledLabel)`
  right: 0;
`;
