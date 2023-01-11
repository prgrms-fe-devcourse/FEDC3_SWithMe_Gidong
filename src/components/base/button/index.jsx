import styled from '@emotion/styled';
import { forwardRef } from 'react';

function Button({ children, as, bgcolor, color, round, onClick, ...props }) {
  return (
    <StyledButton
      as={as || 'button'}
      bgcolor={bgcolor}
      color={color}
      round={round}
      style={{ ...props.style }}
      onClick={onClick}
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
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : '#d9d9d9')};
  color: ${({ color }) => (color ? color : '#000000')};
  border-radius: ${({ round }) => (round ? '0.3rem' : 'none')};
  border: none;
  cursor: pointer;
`;
