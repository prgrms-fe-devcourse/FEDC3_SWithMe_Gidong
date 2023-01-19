import styled from '@emotion/styled';
import { SearchResultContainer, SearchResultGroup } from '@/components/domain/SearchResult';
import { useLocation } from 'react-router-dom';
import { useGroupContext } from '@/context/GroupProvider';
import { useEffect, useState } from 'react';

function SearchResult() {
  const {
    state: { filterValue, searchValue },
  } = useLocation();
  const { groups } = useGroupContext();

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    setGroupList(groups.value);
  }, [groups?.value]);

  console.log(groups?.value);

  return (
    <StyledPageWrapper>
      <SearchResultContainer title={'그룹명'} groupTotal={groupList?.length}>
        {groupList?.map((group, index) => (
          <SearchResultGroup
            key={index}
            current={group.description.member.length}
            max={group.description.headCount}
            title={group.name}
            tags={group.description.tagList}
            index={index}
          />
        ))}
      </SearchResultContainer>
      <SearchResultContainer title={'태그'} groupTotal={22}></SearchResultContainer>
    </StyledPageWrapper>
  );
}

export default SearchResult;

const StyledPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
