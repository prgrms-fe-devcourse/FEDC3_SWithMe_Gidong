import styled from '@emotion/styled';

export const Line = styled.hr`
  border: none;
  border-top: ${({ color }) => `1px solid ${color}`};

  &.vertical {
    display: inline-block;
    margin: ${({ margin }) => (margin ? `0 ${margin}rem` : '0 0.3rem')};
    width: ${({ height }) => height};
    transform: rotate(90deg);
  }

  &.horizontal {
    display: block;
    margin: ${({ margin }) => (margin ? `${margin}rem 0` : undefined)};
    height: ${({ height }) => height};
  }
`;
