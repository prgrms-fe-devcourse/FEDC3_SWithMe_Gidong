import { Text } from '@/components/base';
import useInput from '@/hooks/useInput';
import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { useEffect } from 'react';

const Textarea = forwardRef(
  (
    {
      defaultValue = '',
      placeholder = '입력하세요.',
      max,
      label,
      block = false,
      invalid = false,
      required = false,
      disabled = false,
      readonly = false,
      resize = false,
      wrapperProps,
      ...props
    },
    ref,
  ) => {
    const { value, onChange } = useInput(defaultValue);

    const handleChange = (e) => {
      if (max && e.target.value.length > max) {
        e.target.value = e.target.value.slice(0, max);
      }
      if (ref) ref.current = e.target.value;
      onChange && onChange(e.target.value);
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

    useEffect(() => {
      onChange && onChange(defaultValue);
    }, [defaultValue]);

    return (
      <TextareaContainer block={block} {...wrapperProps}>
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
          <Text size='small' weight={300}>
            {label ? label : max ? value.length + ' / ' + max : ''}
          </Text>
        </StyledLabel>
      </TextareaContainer>
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;

const TextareaContainer = styled.div`
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
  background-color: #f3f3f3;
  box-sizing: border-box;
  padding: 1rem;
  resize: ${({ resize }) => (resize ? 'auto' : 'none')};
`;