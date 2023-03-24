import { StyledButton } from './styles';

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
