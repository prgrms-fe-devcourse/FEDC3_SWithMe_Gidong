import styled from '@emotion/styled';

const SizeToCssValue = {
  small: '1.4rem',
  medium: '2rem',
  large: '3rem',
};

export const Icon = styled.i`
  font-size: ${({ size }) => SizeToCssValue[size]};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : undefined)};
  color: ${({ color }) => color};

  &.heart {
    background: ${({ theme }) => `linear-gradient(to top, ${theme.colors.main_300}, ${theme.colors.main_800})`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      ${({ theme }) => `linear-gradient(to top, ${theme.colors.main_400}, ${theme.colors.main_900})`}
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
