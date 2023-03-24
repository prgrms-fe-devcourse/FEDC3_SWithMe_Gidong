import { imgSearch } from '@/assets/images';
import { Empty, Header, Pagination, Text } from '@/components/base';
import { SearchResultGroup } from '@/components/domain/SearchResult';
import { COLOR } from '@/styles/color';
import { useState } from 'react';
import { StyledGroupList, StyledHeader, StyledSearchResult, StyledSearchResultContainer } from './styles';

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
              {groupList.slice(offset, offset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
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
