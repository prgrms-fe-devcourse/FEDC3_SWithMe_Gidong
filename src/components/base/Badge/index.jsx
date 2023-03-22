import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

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

const StyledBadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledSuper = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.8rem;
  font-size: 1.2rem;
  border-radius: 2rem;
  color: white;
  background-color: ${COLOR.RED};
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

    top: 0.2rem;
    right: 0.3rem;
  }
`;
