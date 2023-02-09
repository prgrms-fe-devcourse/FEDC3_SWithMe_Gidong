import { Header, Pagination, Text, Empty } from '@/components/base';
import { SearchResultGroup } from '@/components/domain/SearchResult';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState } from 'react';
import { imgSearch } from '@/assets/images';

const PAGINATION_CONTENTS_LIMIT = 5;

function SearchResultContainer({ title, groupList }) {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PAGINATION_CONTENTS_LIMIT;

  return (
    <StyledSearchResultContainer>
      <StyledHeader>
        <Header strong size={30}>
          {title}
        </Header>
        <Text size={1.5}>
          전체 <Text style={{ color: COLOR.RED }}>{groupList?.length}개</Text> 그룹
        </Text>
      </StyledHeader>
      <StyledSearchResult>
        {groupList?.length > 0 ? (
          <>
            <StyledGroupList>
              {groupList?.slice(offset, offset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
                <SearchResultGroup key={group._id} group={group} index={index} />
              ))}
            </StyledGroupList>
            <Pagination limit={PAGINATION_CONTENTS_LIMIT} total={groupList?.length} onChange={setCurrentPage} />
          </>
        ) : (
          <Empty src={imgSearch} width={30} mainText='그룹 검색 결과가 없습니다.' />
        )}
      </StyledSearchResult>
    </StyledSearchResultContainer>
  );
}

export default SearchResultContainer;

const StyledSearchResultContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 10rem 10rem 0 10rem;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

const StyledSearchResult = styled.div`
  margin: 3rem 0;
  padding: 3rem;
  border-radius: 1rem;
  background-color: ${COLOR.GRAY_10};
`;

const StyledGroupList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24rem);
  gap: 3rem 0;
  padding: 1rem;

  justify-content: center;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
`;
