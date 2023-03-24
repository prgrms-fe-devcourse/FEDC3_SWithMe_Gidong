import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledSignInputContainer, StyledSignInput, StyledLabel, StyledLengthLabel } from './styles';
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
      {isSignupInput && (
        <StyledLengthLabel>
          <Text size={1.2} weight={300}>
            {value.length}/20
          </Text>
        </StyledLengthLabel>
      )}
      <StyledLabel>
        <Text paragraph size={1.2} color={COLOR.RED}>
          {alert}
        </Text>
      </StyledLabel>
    </StyledSignInputContainer>
  );
}

export default SignInput;
