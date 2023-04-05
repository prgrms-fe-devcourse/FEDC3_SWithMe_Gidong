import { Text } from '@/components/base';
import * as S from './styles';
import PropTypes from 'prop-types';

function Input({
  type = 'text',
  value = '',
  onChange,
  onKeyPress,
  placeholder = '',
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  max,
  size = 'full',
  fontSize = 'default',
  ...props
}) {
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

    onChange && onChange(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (!onKeyPress || e.key !== 'Enter') {
      return;
    }

    onKeyPress(e);
    onChange && onChange('');
  };

  return (
    <S.Container block={block} size={size}>
      <S.Input
        type='text'
        placeholder={placeholder}
        invalid={invalid}
        required={required}
        disabled={disabled}
        readonly={readonly}
        readOnly={readonly}
        max={max ? max : 'none'}
        value={type === 'number' ? (parseInt(value) ? parseInt(value) : 0) : value}
        onChange={(e) => handleInputChange(e)}
        onKeyPress={handleKeyPress}
        size={size}
        block={block}
        fontSize={fontSize}
        {...props}
      />
      <S.Label>
        <Text size={type === 'number' ? 'xSmall' : 'small'} weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </S.Label>
    </S.Container>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  block: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  max: PropTypes.number,
  size: PropTypes.oneOf(['full', 'small']),
  fontSize: PropTypes.oneOf(['default', 'medium', 'large']),
};

export default Input;
