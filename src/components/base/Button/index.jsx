import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { forwardRef } from 'react';

function Button({ children, as, bgcolor, color, round, disabled, onClick, ...props }) {
  return (
    <StyledButton
      as={as || 'button'}
      bgcolor={bgcolor}
      color={color}
      round={round}
      style={{ ...props.style }}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;

const View = forwardRef(({ as, style, ...props }, ref) => {
  const Element = as || 'button';
  return <Element ref={ref} style={{ ...style }} {...props} />;
});
View.displayName = 'View';

const StyledButton = styled(View)`
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : COLOR.GRAY)};
  color: ${({ color }) => (color ? color : COLOR.DARK)};
  border-radius: ${({ round }) => (round ? '0.3rem' : 'none')};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
