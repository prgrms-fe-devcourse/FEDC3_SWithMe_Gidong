import { Text } from '@/components/base';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { forwardRef, useEffect } from 'react';

const Input = forwardRef(
  (
    {
      type = 'text',
      defaultValue = '',
      placeholder = '',
      label,
      block = false,
      invalid = false,
      required = false,
      disabled = false,
      readonly = false,
      max,
      onKeyPress,
      wrapperProps,
      ...props
    },
    ref,
  ) => {
    const { value, onChange } = useInput(defaultValue);

    const handleInputChange = (e) => {
      if (type === 'number') {
        e.target.value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
        if (max && e.target.value > max) {
          e.target.value = max;
        }
      } else {
        if (max && e.target.value.length > max) {
          e.target.value = e.target.value.slice(0, max);
        }
      }
      if (ref && !Array.isArray(ref.current)) {
        ref.current = e.target.value;
      }
      onChange && onChange(e.target.value);
    };

    useEffect(() => {
      onChange && onChange(defaultValue);
    }, [defaultValue]);

    return (
      <StyledInputContainer block={block} {...wrapperProps}>
        <StyledInput
          type='text'
          placeholder={placeholder}
          invalid={invalid}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          max={max ? max : 'none'}
          value={type === 'number' ? (parseInt(value) ? parseInt(value) : 0) : value}
          onChange={(e) => handleInputChange(e)}
          onKeyPress={(e) => {
            if (onKeyPress && e.key === 'Enter') {
              onKeyPress(e);
              onChange && onChange('');
            }
          }}
          {...props}
        />
        <StyledLabel>
          <Text size={type === 'number' ? 0.9 : 1.2} weight={300}>
            {label ? label : max ? value.length + ' / ' + max : ''}
          </Text>
        </StyledLabel>
      </StyledInputContainer>
    );
  },
);
Input.displayName = 'Input';

export default Input;

const StyledInputContainer = styled.div`
  position: relative;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  margin: 1rem 0 2rem 0;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
  box-sizing: border-box;
`;
