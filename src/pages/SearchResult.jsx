import { Pagination } from '@/components/base';
import { SearchResultContainer, SearchResultGroup } from '@/components/domain/SearchResult';
import { useGroupContext } from '@/context/GroupProvider';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGINATION_CONTENTS_LIMIT = 8;
const FILLTER_OPTIONS = ['전체', '그룹명', '태그'];

function SearchResult() {
  const {
    state: { filterValue, searchValue },
  } = useLocation();
  const navigate = useNavigate();
  const { groups } = useGroupContext();

  const [groupList, setGroupList] = useState();
  const [groupListByName, setGroupListByName] = useState([]);
  const [groupListByTag, setGroupListByTag] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PAGINATION_CONTENTS_LIMIT;

  const searchGroupByName = () => {
    setGroupListByName(
      groupList?.filter((group) => {
        return group.name.toLowerCase().includes(searchValue.toLowerCase());
      }),
    );
  };

  const isIncludesTag = (value) => {
    if (value.toLowerCase().includes(searchValue.toLowerCase())) return true;

    return false;
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
    console.log(groupListByName);
    console.log(groupListByTag);
  }, [groupList, filterValue, searchValue]);

  return (
    <StyledPageWrapper>
      {filterValue !== FILLTER_OPTIONS[2] && (
        <>
          <SearchResultContainer title={'그룹명'} groupTotal={groupListByName?.length}>
            {groupListByName?.slice(offset, offset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
              <SearchResultGroup key={group._id} group={group} index={index} onClick={() => onClickJoinGroup(group)} />
            ))}
          </SearchResultContainer>
          <Pagination
            defaultPage={0}
            limit={PAGINATION_CONTENTS_LIMIT}
            total={groupListByName?.length}
            onChange={setCurrentPage}
          />
        </>
      )}

      {filterValue !== FILLTER_OPTIONS[1] && (
        <>
          <SearchResultContainer title={'태그'} groupTotal={groupListByTag?.length}>
            {groupListByTag?.slice(offset, offset + PAGINATION_CONTENTS_LIMIT).map((group, index) => (
              <SearchResultGroup key={group._id} group={group} index={index} onClick={() => onClickJoinGroup(group)} />
            ))}
          </SearchResultContainer>
          <Pagination
            defaultPage={0}
            limit={PAGINATION_CONTENTS_LIMIT}
            total={groupListByTag?.length}
            onChange={setCurrentPage}
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
