import { SearchResultContainer } from '@/components/domain/SearchResult';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useGetGroupList } from '@/hooks/queries/group';

const FILTER_BY = {
  NAME: '그룹명',
  TAG: '태그',
};

function SearchResult() {
  const {
    state: { filterValue, searchValue },
  } = useLocation();
  const { data: groupList } = useGetGroupList();
  const lowerSearchValue = searchValue.toLowerCase();

  const searchGroupByName = () => {
    return groupList?.filter(({ name }) => name.toLowerCase().includes(lowerSearchValue));
  };

  const searchGroupByTag = () => {
    return groupList?.filter(({ description }) =>
      description.tagList.some((tag) => tag.toLowerCase().includes(lowerSearchValue)),
    );
  };

  return (
    <StyledPageWrapper>
      {filterValue !== FILTER_BY.TAG && (
        <SearchResultContainer title={FILTER_BY.NAME} groupList={searchGroupByName()} />
      )}
      {filterValue !== FILTER_BY.NAME && <SearchResultContainer title={FILTER_BY.TAG} groupList={searchGroupByTag()} />}
    </StyledPageWrapper>
  );
}

export default SearchResult;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;
`;
