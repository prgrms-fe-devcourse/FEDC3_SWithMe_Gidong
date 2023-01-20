import { Pagination } from '@/components/base';
import { SearchResultContainer, SearchResultGroup } from '@/components/domain/SearchResult';
import { useGroupContext } from '@/context/GroupProvider';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGINATION_CONTENTS_LIMIT = 8;
const FILLTER_BY = {
  ALL: '전체',
  NAME: '그룹명',
  TAG: '태그',
};

function SearchResult() {
  const {
    state: { filterValue, searchValue },
  } = useLocation();
  const navigate = useNavigate();
  const { groups } = useGroupContext();

  const [groupList, setGroupList] = useState();
  const [groupListByName, setGroupListByName] = useState([]);
  const [groupListByTag, setGroupListByTag] = useState([]);
  const [nameCurrentPage, setNameCurrentPage] = useState(0);
  const [tagcurrentPage, setTagcurrentPage] = useState(0);

  const nameOffset = nameCurrentPage * PAGINATION_CONTENTS_LIMIT;
  const tagOffset = tagcurrentPage * PAGINATION_CONTENTS_LIMIT;

  const searchGroupByName = () => {
    setGroupListByName(
      groupList?.filter((group) => {
        return group.name.toLowerCase().includes(searchValue.toLowerCase());
      }),
    );
  };

  const isIncludesTag = (value) => {
    return value.toLowerCase().includes(searchValue.toLowerCase());
  };

  const searchGroupByTag = () => {
    setGroupListByTag(
      groupList?.filter((group) => {
        return group.description.tagList
          .map((tag) => {
            return isIncludesTag(tag);
          })
          .includes(true);
      }),
    );
  };

  const onClickJoinGroup = (group) => {
    navigate('/joinGroup', { state: { group } });
  };

  useEffect(() => {
    setGroupList(groups.value);
  }, [groups?.value]);
  useEffect(() => {
    if (!groupList) return;
    searchGroupByName();
    searchGroupByTag();
  }, [groupList, filterValue, searchValue]);

  return (
    <StyledPageWrapper>
      {filterValue !== FILLTER_BY.TAG && (
        <>
          <SearchResultContainer title={FILLTER_BY.NAME} groupTotal={groupListByName?.length}>
            {groupListByName?.slice(nameOffset, nameOffset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
              <SearchResultGroup key={group._id} group={group} index={index} onClick={() => onClickJoinGroup(group)} />
            ))}
          </SearchResultContainer>
          <Pagination
            defaultPage={0}
            limit={PAGINATION_CONTENTS_LIMIT}
            total={groupListByName?.length}
            onChange={setNameCurrentPage}
          />
        </>
      )}

      {filterValue !== FILLTER_BY.NAME && (
        <>
          <SearchResultContainer title={FILLTER_BY.TAG} groupTotal={groupListByTag?.length}>
            {groupListByTag?.slice(tagOffset, tagOffset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
              <SearchResultGroup key={group._id} group={group} index={index} onClick={() => onClickJoinGroup(group)} />
            ))}
          </SearchResultContainer>
          <Pagination
            defaultPage={0}
            limit={PAGINATION_CONTENTS_LIMIT}
            total={groupListByTag?.length}
            onChange={setTagcurrentPage}
          />
        </>
      )}
    </StyledPageWrapper>
  );
}

export default SearchResult;

const StyledPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
