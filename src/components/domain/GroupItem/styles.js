import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';

const StyledGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ isOpened }) => (isOpened ? '2rem 1rem 0 1rem' : '2rem 1rem')};
  ${({ isLastGroup, isOpened }) =>
    !isLastGroup &&
    !isOpened &&
    css`
      border-bottom: 0.1rem solid ${COLOR.GRAY_10};
    `};
  font-size: 2rem;

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1rem;
    color: ${COLOR.GRAY_30};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${COLOR.TAG_COLOR[1]};
    }
  }
`;

const StyledGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 2rem;
`;

const StyledGroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledGroupIcons = styled.div`
  color: ${COLOR.GRAY_30};

  & > i {
    padding-left: 1rem;
    cursor: pointer;
    &:hover {
      color: ${COLOR.TAG_COLOR[1]};
    }
  }
`;

const StyledTagList = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const StyledTag = styled.div`
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  background-color: ${({ i }) => COLOR.TAG_COLOR[i]};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLOR.WHITE};
`;

const StyledToggleButton = styled.div`
  & > i {
    transition: transform 0.3s ease-in-out;
    transform: rotateZ(0deg);
    transform: ${({ isOpened }) => isOpened && 'rotateZ(180deg)'};
  }
`;

export {
  StyledGroupHeader,
  StyledGroupInfo,
  StyledGroupTitle,
  StyledGroupIcons,
  StyledTagList,
  StyledTag,
  StyledToggleButton,
};
