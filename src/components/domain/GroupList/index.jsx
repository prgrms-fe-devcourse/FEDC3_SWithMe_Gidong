import styled from '@emotion/styled';
import { useGroupContext } from '@/context/GroupProvider';
import GroupItem from '@/components/domain/GroupItem';
import { COLOR } from '@/styles/color';
import { imgSearch } from '@/assets/images';
import { Empty, Spinner } from '@/components/base';
import TILList from '@/components/domain/TILList';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function GroupList() {
  const {
    groups: { value: groups, isLoading },
    openedGroupId,
  } = useGroupContext();

  return (
    <>
      {isLoading ? (
        <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
      ) : (
        <StyledGroupList isEmpty={!groups?.length}>
          {groups?.length ? (
            groups.map((group, i) => (
              <Fragment key={group._id}>
                <Link to='/joinGroup' state={{ group }}>
                  그룹 가입하기
                </Link>
                <GroupItem group={group} isLastGroup={groups.length - 1 === i} />
                {openedGroupId === group._id && <TILList groupId={group._id} groupName={group.name} />}
              </Fragment>
            ))
          ) : (
            <Empty src={imgSearch} width={25} mainText='참여중인 그룹이 없습니다.' subText='그룹에 참여해보세요!' />
          )}
        </StyledGroupList>
      )}
    </>
  );
}

export default GroupList;

const StyledGroupList = styled.ul`
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${({ isEmpty }) => (isEmpty ? COLOR.GRAY_10 : COLOR.WHITE)};
`;
