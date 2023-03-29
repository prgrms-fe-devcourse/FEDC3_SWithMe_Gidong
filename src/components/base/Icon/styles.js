import styled from '@emotion/styled';

const SizeToCssValue = {
  small: '1.4rem',
  medium: '2rem',
  large: '3rem',
  xLarge: '4rem',
  huge: '6.4rem',
};

export const StyledIcon = styled.i`
  font-size: ${({ size }) => SizeToCssValue[size]};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : undefined)};
  color: ${({ color }) => color};

  &.heart {
    background: linear-gradient(to top, #fba194, #f6416c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      background: linear-gradient(to top, #ff8d7b, #ff3161);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
