/* eslint-disable indent */
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const FontSizeToCssValue = {
  xSmall: '1rem',
  small: '1.4rem',
  medium: '1.6rem',
  large: '1.8rem',
  xLarge: '2.2rem',
};

const ShapeToCssValue = {
  square: 'none',
  round: {
    full: '0.6rem',
    large: '0.6rem',
    medium: '0.6rem',
    small: '0.3rem',
    default: '0',
  },
  circle: '100%',
};

const SizeToCssValue = {
  full: {
    padding: '1.2rem 0',
    width: '100%',
  },
  large: {
    padding: '1.2rem 3.8rem',
  },
  medium: {
    padding: '1.2rem 1.8rem',
  },
  small: {
    padding: '1rem 1.6rem',
  },
  default: {
    padding: '0',
    margin: '0',
  },
};

export const Button = styled.button`
  border: none;
  border-radius: ${({ shape, size }) =>
    ShapeToCssValue[shape][size] ? ShapeToCssValue[shape][size] : ShapeToCssValue[shape]};

  font-size: ${({ fontSize }) => FontSizeToCssValue[fontSize]};
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ size }) =>
    size &&
    css`
      ${SizeToCssValue[size]}
    `}

  ${({ version, theme }) =>
    version === 'transparent'
      ? css`
          background-color: transparent;
          border: none;

          :hover {
            font-weight: 700;
            text-decoration: underline;
          }
        `
      : version === 'main'
      ? css`
          background-color: ${theme.colors.main_700};
          color: ${theme.colors.white_900};

          :hover {
            background-color: ${theme.colors.main_600};
          }
        `
      : version === 'primary'
      ? css`
          background-color: ${theme.colors.main_100};
          color: ${theme.colors.white_900};

          :disabled {
            background-color: ${theme.colors.black_100};
          }

          :not(:disabled) {
            :hover {
              background-color: ${theme.colors.main_50};
            }
          }
        `
      : version === 'grayInverted'
      ? css`
          background-color: ${theme.colors.white_900};
          color: ${theme.colors.black_300};
          border: 0.1rem solid ${theme.colors.black_300};

          :hover {
            color: ${theme.colors.main_100};
            border-color: ${theme.colors.main_100};
          }
        `
      : version === 'red'
      ? css`
          background-color: ${theme.colors.red_900};
          color: ${theme.colors.white_900};

          :hover {
            background-color: ${theme.colors.red_800};
          }
        `
      : css``}
`;
