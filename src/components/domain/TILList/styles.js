import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const StyledTILList = styled.div`
  border-bottom: 0.1rem solid ${COLOR.GRAY_10};
`;

const StyledTILWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24rem);
  gap: 3rem 0;
  padding: 1rem;

  justify-content: center;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  max-width: 100rem;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: smoothAppear 1s;
`;

const StyledFilterWrapper = styled.div`
  margin: 0 1rem 1rem 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.1rem solid ${COLOR.GRAY_10};
`;

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  padding-top: 0.5rem;

  & button {
    width: fit-content;
    white-space: nowrap;
    padding: 0;
  }
`;

const StyledViewType = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFilterButton = styled.div`
  font-size: 1.3rem;
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 600;
    `};
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-bottom: 2rem;
  margin-top: 3rem;

  & > button > i {
    margin-right: 1rem;
  }
`;

export {
  StyledTILList,
  StyledTILWrapper,
  StyledFilterWrapper,
  StyledFilter,
  StyledViewType,
  StyledFilterButton,
  StyledButtonWrapper,
};
