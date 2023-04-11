import * as S from './styles';
import PropTypes from 'prop-types';

function Button({
  children,
  type = 'button',
  version = 'primary',
  shape = 'square',
  fontSize = 'medium',
  size = 'default',
  isBold = false,
  disabled = false,
  underline,
  onClick,
  props,
}) {
  return (
    <S.Button
      type={type}
      version={version}
      shape={shape}
      fontSize={fontSize}
      size={size}
      isBold={isBold}
      disabled={disabled}
      underline={underline}
      onClick={onClick}
      {...props}>
      {children}
    </S.Button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  version: PropTypes.oneOf(['transparent', 'primary', 'primaryInverted', 'main', 'grayInverted', 'red']),
  shape: PropTypes.oneOf(['square', 'round', 'circle']),
  fontSize: PropTypes.oneOf(['xSmall', 'small', 'medium', 'large', 'xLarge']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large', 'full']),
  isBold: PropTypes.bool,
  disabled: PropTypes.bool,
  underline: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
