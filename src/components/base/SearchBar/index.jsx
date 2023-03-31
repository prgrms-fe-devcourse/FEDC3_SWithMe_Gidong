import { Icon, Text } from '@/components/base';
import { memo } from 'react';
import * as S from './styles';
import PropTypes from 'prop-types';

function SearchBar({
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
  hasIcon = true,
  onChange,
  fontSize = 'medium',
  ...props
}) {
  return (
    <S.Container>
      <S.Input
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
        fontSize={fontSize}
        {...props}
      />
      {hasIcon ? <Icon name='search' size={fontSize} /> : null}
      <S.Label>
        <Text size={type === 'number' ? 0.9 : 1.2} weight={300}>
          {label ? label : max ? value.length + ' / ' + max : ''}
        </Text>
      </S.Label>
    </S.Container>
  );
}

SearchBar.propTypes = {
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  label: PropTypes.string,
  hasIcon: PropTypes.bool,
  onChange: PropTypes.func,
  fontSize: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default memo(SearchBar);
