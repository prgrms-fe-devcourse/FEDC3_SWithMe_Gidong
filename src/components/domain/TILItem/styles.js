import styled from '@emotion/styled';

const StyledTILItem = styled.div`
  position: relative;

  width: 22rem;
  height: 28rem;
  padding: 1.2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.white_600};
  box-shadow: 0 0.1rem 0.4rem ${({ theme }) => theme.shadows[900]};
  color: ${({ theme }) => theme.colors.black_800};

  & > p:nth-of-type(2) {
    word-break: break-all;
  }
`;

const StyledDate = styled.div`
  padding-bottom: 0.5rem;
  text-align: right;
`;

const StyledTILContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > p {
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.2em;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  & > p:nth-of-type(1) {
    height: 2.4em;
    -webkit-line-clamp: 2;
  }

  & > p:nth-of-type(2) {
    height: 3.6em;
    -webkit-line-clamp: 3;
  }
`;

const StyledPlusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;

  width: 5rem;
  height: 5rem;
  border-top: 0.3rem solid ${({ theme }) => theme.shadows[600]};
  border-left: 0.3rem solid ${({ theme }) => theme.shadows[600]};
  border-radius: 1rem 0;
  background-color: ${({ theme }) => theme.colors.TAG_COLOR[0]};

  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.white_900};
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    filter: hue-rotate(90deg);
  }
`;

const StyledTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
`;

const StyledTag = styled.div`
  min-width: fit-content;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0.1rem 0.4rem ${({ theme }) => theme.shadows[900]};
  font-size: 1.2rem;
`;

export { StyledTILItem, StyledDate, StyledTILContent, StyledPlusButton, StyledTagList, StyledTag };
