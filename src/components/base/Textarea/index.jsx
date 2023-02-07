import { Text } from '@/components/base';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { forwardRef, useEffect } from 'react';

function Textarea({
  value = '',
  onChange,
  placeholder = '입력하세요.',
  max,
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  resize = false,
  handleParentChange,
  wrapperProps,
  ...props
}) {

  const handleChange = (e) => {
    if (max && e.target.value.length > max) {
      e.target.value = e.target.value.slice(0, max);
    }
    onChange && onChange(e.target.value);
    handleParentChange && handleParentChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { value, selectionStart, selectionEnd } = e.target;
      e.target.value = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
      e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      handleChange(e);

      return false;
    }
  };

  return (
    <StyledTextareaContainer block={block} {...wrapperProps}>
      <StyledTextarea
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        resize={resize}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        maxLength={max}
        {...props}
      />
      <StyledLabel>
        <Text size={1.2} weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </StyledLabel>
    </StyledTextareaContainer>
  );
}

export default Textarea;

const StyledTextareaContainer = styled.div`
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

const StyledTextarea = styled.textarea`
  width: 100%;
  outline: none;
  border: none;
  background-color: ${COLOR.TEXTAREA_BG};
  box-sizing: border-box;
  padding: 1rem;
  resize: ${({ resize }) => (resize ? 'auto' : 'none')};
`;
