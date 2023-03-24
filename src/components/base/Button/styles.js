import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import View from './View';

const StyledButton = styled(View)`
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : COLOR.GRAY)};
  color: ${({ color }) => (color ? color : COLOR.DARK)};
  border-radius: ${({ round }) => (round ? '0.3rem' : 'none')};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export { StyledButton };
