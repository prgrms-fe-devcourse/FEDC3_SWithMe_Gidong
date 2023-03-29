import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const SizeToCssValue = {
  full: '100%',
  medium: '4rem',
};
const FontSizeToCssValue = {
  default: '1.6rem',
  medium: '1.8rem',
  large: '3rem',
};

const StyledInputContainer = styled.div`
  position: relative;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  margin: 1rem 0 2rem 0;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6rem;
  right: 0;
  background-color: transparent;
`;

const StyledInput = styled.input`
  width: ${({ block, size }) => (block ? '100%' : SizeToCssValue[size])};
  font-size: ${({ fontSize }) => FontSizeToCssValue[fontSize]};
  border: none;
  outline: none;
  border-bottom: ${({ readonly }) =>
    readonly ? 'none' : `0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)}`};
  box-sizing: border-box;

  ${({ size }) =>
    size === 'medium' &&
    css`
      margin: 0 1rem;
    `}
`;

export { StyledInputContainer, StyledLabel, StyledInput };
