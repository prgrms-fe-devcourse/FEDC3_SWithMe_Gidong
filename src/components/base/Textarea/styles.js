import styled from '@emotion/styled';

export const TextareaContainer = styled.div`
  width: 100%;
  position: relative;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  margin: 1rem 0 2rem 0;
`;

export const Label = styled.label`
  display: block;
  position: absolute;
  bottom: -1.6em;
  right: 0;
  background-color: transparent;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 16rem;
  padding: 1rem;
  font-size: 1.2rem;

  outline: none;
  border: ${({ needBorder, theme }) => (needBorder ? `0.1rem solid ${theme.colors.black_800}` : 'none')};

  background-color: ${({ theme }) => theme.colors.white_500};
  box-sizing: border-box;
  resize: none;
`;
