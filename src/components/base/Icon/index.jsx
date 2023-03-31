import PropTypes from 'prop-types';
import * as S from './styles';

function Icon({ type = 'solid', name = 'xmark', size = 'small', color, isPointer = false, ...props }) {
  return (
    <S.Icon
      className={`fa-${type} fa-${name} ${name}`}
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  isPointer: PropTypes.bool,
};

export default Icon;
