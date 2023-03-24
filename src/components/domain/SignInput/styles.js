import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledSignInputContainer = styled.div`
  position: relative;
  display: block;
`;

const StyledSignInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 0.1rem solid ${({ invalid }) => (invalid ? COLOR.RED : COLOR.GRAY)};
  box-sizing: border-box;
  margin: 1rem 0 2rem 0;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: 0.3em;
  background-color: transparent;
`;

const StyledLengthLabel = styled(StyledLabel)`
  right: 0;
`;

export { StyledSignInputContainer, StyledSignInput, StyledLabel, StyledLengthLabel };
