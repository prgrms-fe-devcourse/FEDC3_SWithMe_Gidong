import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const FontSizeToCssValue = {
  small: '1.4rem',
  medium: '1.6rem',
  large: '3rem',
};

const StyledInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: ${({ fontSize }) => FontSizeToCssValue[fontSize]};
  border: none;
  outline: none;
  border-bottom: ${({ readonly, invalid }) => (readonly ? 'none' : `0.1rem solid ${invalid ? COLOR.RED : COLOR.GRAY}`)};
  box-sizing: border-box;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;

export { StyledInputContainer, StyledInput, StyledLabel };
