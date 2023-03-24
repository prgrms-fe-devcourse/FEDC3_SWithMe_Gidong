import { StyledBadgeContainer, StyledSuper } from './styles';

function Badge({ children, count, maxCount, showZero, dot = false, bgColor, textColor, ...props }) {
  const colorStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  let badge = null;
  if (count) {
    badge = <StyledSuper style={colorStyle}>{maxCount && count > maxCount ? `${maxCount}+` : count}</StyledSuper>;
  } else {
    if (count !== undefined) {
      badge = showZero ? <StyledSuper style={colorStyle}>0</StyledSuper> : null;
    } else if (dot) {
      badge = <StyledSuper className='dot' style={colorStyle} />;
    }
  }

  return (
    <StyledBadgeContainer {...props}>
      {children}
      {badge}
    </StyledBadgeContainer>
  );
}

export default Badge;
