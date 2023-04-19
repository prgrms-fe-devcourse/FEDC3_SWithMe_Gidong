import { imgSearch } from '@/assets/images';
import { Empty, Heading, Pagination, Text } from '@/components/base';
import { SearchResultGroup } from '@/components/domain/SearchResult';

import { useState } from 'react';

import theme from '@/styles/theme';
import * as S from './styles';

const PAGINATION_CONTENTS_LIMIT = 5;

function SearchResultContainer({ title, groupList }) {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PAGINATION_CONTENTS_LIMIT;

  return (
    <S.SearchResultContainer>
      <S.SearchResultHeader>
        <Heading level={4}>{title}</Heading>
        <Text size='medium'>
          전체{' '}
          <Text color={theme.colors.red_900} inherit>
            {groupList?.length}개
          </Text>{' '}
          그룹
        </Text>
      </S.SearchResultHeader>
      <S.SearchResultBody>
        {groupList?.length > 0 ? (
          <>
            <S.SearchResultGroupList>
              {groupList.slice(offset, offset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
                <SearchResultGroup key={group._id} group={group} index={index} />
              ))}
            </S.SearchResultGroupList>
            <Pagination limit={PAGINATION_CONTENTS_LIMIT} total={groupList?.length} onChange={setCurrentPage} />
          </>
        ) : (
          <Empty src={imgSearch} imageWidth='30rem' mainText='그룹 검색 결과가 없습니다.' />
        )}
      </S.SearchResultBody>
    </S.SearchResultContainer>
  );
}

export default SearchResultContainer;
