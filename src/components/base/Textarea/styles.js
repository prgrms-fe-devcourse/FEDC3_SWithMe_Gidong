import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledTextareaContainer = styled.div`
  width: 100%;
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
  height: 16rem;
  padding: 1rem;
  font-size: 1.2rem;

  outline: none;
  border: ${({ needBorder }) => (needBorder ? `0.1rem solid ${COLOR.DARK}` : 'none')};

  background-color: ${COLOR.TEXTAREA_BG};
  box-sizing: border-box;
  resize: none;
`;

export { StyledTextareaContainer, StyledLabel, StyledTextarea };
