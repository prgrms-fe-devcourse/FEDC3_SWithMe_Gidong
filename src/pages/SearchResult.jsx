import { SearchResultContainer } from '@/components/domain/SearchResult';

import { useGetGroupList } from '@/hooks/queries/group';
import { useLocation } from 'react-router-dom';
import { cleanWordSpacing } from '@/utils/regex';

import styled from '@emotion/styled';

const FILTER_BY = {
  NAME: '그룹명',
  TAG: '태그',
};

function SearchResult() {
  const {
    state: { filterValue, searchValue },
  } = useLocation();
  const { data: groupList } = useGetGroupList();

  const filterText = (textValue) => {
    return cleanWordSpacing(textValue.toLowerCase());
  };

  const searchGroupByName = () => {
    return groupList?.filter(({ name }) => filterText(name).includes(filterText(searchValue)));
  };

  const searchGroupByTag = () => {
    console.log(groupList);
    return groupList?.filter(({ description }) =>
      description.tagList.some((tag) => filterText(tag).includes(filterText(searchValue))),
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
