import { Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { memo } from 'react';

const SearchBar = ({
  type = 'text',
  value = '',
  placeholder = '',
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  max,
  min,
  label,
  icon = true,
  onChange,
  iconProps,
  wrapperProps,
  ...props
}) => {
  return (
    <StyledInputContainer {...wrapperProps}>
      <StyledInput
        type={type}
        placeholder={placeholder}
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        max={max ? max : 'none'}
        min={min ? min : 'none'}
        value={type === 'number' ? (parseInt(value) ? parseInt(value) : 0) : value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {icon ? <Icon name='search' {...iconProps} /> : null}
      <StyledLabel>
        <Text size={type === 'number' ? 0.9 : 1.2} weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </StyledLabel>
    </StyledInputContainer>
  );
};

export default memo(SearchBar);

const StyledInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 0.3rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;
