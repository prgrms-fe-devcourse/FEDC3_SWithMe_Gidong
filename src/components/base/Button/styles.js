import styled from '@emotion/styled';
import View from './View';

export const Button = styled(View)`
  background-color: ${({ bgcolor, theme }) => (bgcolor ? bgcolor : theme.colors.white_50)};
  color: ${({ color, theme }) => (color ? color : theme.colors.black_900)};
  border-radius: ${({ round }) => (round ? '0.3rem' : 'none')};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
