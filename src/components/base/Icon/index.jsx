import PropTypes from 'prop-types';
import * as S from './styles';

function Icon({ type = 'solid', name = 'xmark', size = 'small', color = 'inherit', isPointer = false, ...props }) {
  return (
    <S.StyledIcon
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
  size: PropTypes.oneOf(['xSmall', 'small', 'medium', 'large']),
  color: PropTypes.string,
  isPointer: PropTypes.bool,
};

export default Icon;
