import styled from '@emotion/styled';

const SizeToCssValue = {
  xSmall: '1rem',
  small: '1.4rem',
  medium: '2rem',
  large: '3rem',
};

export const StyledIcon = styled.i`
  font-size: ${({ size }) => SizeToCssValue[size]};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : undefined)};
  color: ${({ color }) => color};
`;
