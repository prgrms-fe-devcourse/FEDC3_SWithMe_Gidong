import { Text } from '@/components/base';
import PropTypes from 'prop-types';
import { StyledLabel, StyledTextarea, StyledTextareaContainer } from './styles';

function Textarea({
  value = '',
  onChange,
  placeholder = '입력하세요.',
  max,
  label,
  block = false,
  required = false,
  disabled = false,
  readonly = false,
  needBorder = false,
  handleParentChange,
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
    <StyledTextareaContainer block={block}>
      <StyledTextarea
        required={required}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={max}
        needBorder={needBorder}
        {...props}
      />
      <StyledLabel>
        <Text size='small' weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </StyledLabel>
    </StyledTextareaContainer>
  );
}

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholer: PropTypes.string,
  max: PropTypes.number,
  label: PropTypes.string,
  block: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  needBorder: PropTypes.bool,
  handleParentChange: PropTypes.func,
};

export default Textarea;
