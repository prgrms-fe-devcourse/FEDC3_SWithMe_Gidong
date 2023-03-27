import { Icon, Text } from '@/components/base';
import { memo } from 'react';
import { StyledInputContainer, StyledInput, StyledLabel } from './styles';

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
        <Text size={type === 'number' ? 'xSmall' : 'small'} weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </StyledLabel>
    </StyledInputContainer>
  );
};

export default memo(SearchBar);
