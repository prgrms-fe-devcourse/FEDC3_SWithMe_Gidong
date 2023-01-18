import styled from '@emotion/styled';
import { SearchResultContainer, SearchResultGroup } from '@/components/domain/SearchResult';

function SearchResult() {
  const dummyGroups = [
    { current: 2, max: 5, groupTitle: '데브코스' },
    { current: 41, max: 50, groupTitle: '프롱프롱프롱이' },
    { current: 15, max: 20, groupTitle: '스윗미!스윗미!스윗미!스윗미!스윗미!' },
    { current: 50, max: 50, groupTitle: '스터디' },
    { current: 24, max: 44, groupTitle: '위드' },
    { current: 44, max: 50, groupTitle: '미' },
    { current: 14, max: 21, groupTitle: '스터디위드미' },
    { current: 4, max: 10, groupTitle: '중간프로젝트' },
  ];

  return (
    <StyledPageWrapper>
      <SearchResultContainer title={'그룹명'} groupTotal={88}>
        {dummyGroups.map((group, index) => (
          <SearchResultGroup
            key={index}
            groupCurrent={group.current}
            groupMax={group.max}
            groupTitle={group.groupTitle}
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
