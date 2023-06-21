import PropTypes from 'prop-types';
import * as S from './styles';

function Badge({ children, count, maxCount, showZero, dot = false, bgColor, textColor, ...props }) {
  const colorStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  let badge = null;
  if (count) {
    badge = <S.Super style={colorStyle}>{maxCount && count > maxCount ? `${maxCount}+` : count}</S.Super>;
  } else {
    if (count !== undefined) {
      badge = showZero ? <S.Super style={colorStyle}>0</S.Super> : null;
    } else if (dot) {
      badge = <S.Super className='dot' style={colorStyle} />;
    }
  }

  return (
    <S.BadgeContainer {...props}>
      {children}
      {badge}
    </S.BadgeContainer>
  );
}

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  showZero: PropTypes.bool,
  dot: PropTypes.bool,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Badge;
