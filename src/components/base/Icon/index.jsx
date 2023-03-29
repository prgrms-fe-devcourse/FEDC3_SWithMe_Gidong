import PropTypes from 'prop-types';
import * as S from './styles';

function Icon({ type = 'solid', name = 'xmark', size = 'small', color, isPointer = false, className = '', ...props }) {
  return (
    <S.StyledIcon
      className={`${className} fa-${type} fa-${name} ${name}`}
      style={{ ...props.style }}
      size={size}
      color={color}
      isPointer={isPointer}
      {...props}
    />
  );
}

Icon.propTypes = {
  type: PropTypes.oneOf(['light', 'regular', 'solid', 'thin']),
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xLarge', 'huge']),
  color: PropTypes.string,
  isPointer: PropTypes.bool,
  className: PropTypes.string,
};

export default Icon;
