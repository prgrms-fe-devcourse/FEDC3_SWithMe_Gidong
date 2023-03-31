import styled from '@emotion/styled';

const FontSizeToCssValue = {
  small: '1.4rem',
  medium: '1.6rem',
  large: '3rem',
};

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  font-size: ${({ fontSize }) => FontSizeToCssValue[fontSize]};
  border: none;
  outline: none;
  border-bottom: ${({ readonly, invalid, theme }) =>
    readonly ? 'none' : `0.1rem solid ${invalid ? theme.colors.red_900 : theme.colors.black_400}`};
  box-sizing: border-box;
`;

export const Label = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;
