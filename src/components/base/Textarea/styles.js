import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledTextareaContainer = styled.div`
  position: relative;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  margin: 1rem 0 2rem 0;
`;

const StyledLabel = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  outline: none;
  border: none;
  background-color: ${COLOR.TEXTAREA_BG};
  box-sizing: border-box;
  padding: 1rem;
  resize: ${({ resize }) => (resize ? 'auto' : 'none')};
`;

export { StyledTextareaContainer, StyledLabel, StyledTextarea };
