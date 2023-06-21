import styled from '@emotion/styled';

export const SearchResultContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 10rem 10rem 0 10rem;

  @media (max-width: 623.98px) {
    padding: 10rem 4rem 0 4rem;
  }
`;

export const SearchResultHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

export const SearchResultBody = styled.div`
  margin: 3rem 0;
  padding: 3rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.white_300};
`;

export const SearchResultGroupList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24rem);
  gap: 3rem 0;
  padding: 1rem;

  justify-content: center;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
`;

export const GroupCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 22rem;
  height: 30rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.white_900};

  & > h6 {
    width: 18rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const GroupUserCount = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

export const GroupTags = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 1rem;

  width: 100%;
  height: 17.6rem;
  padding: 1.8rem 0;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.white_300};
  color: ${({ theme }) => theme.colors.black_500};
`;
