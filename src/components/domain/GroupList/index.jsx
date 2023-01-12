import styled from '@emotion/styled';
import { useGroupContext } from '@/context/GroupProvider';
import GroupItem from '@/components/domain/GroupItem';
import { COLOR } from '@/styles/color';
import { imgSearch } from '@/assets/images';
import { Text } from '@/components/base';
import TILList from '@/components/domain/TILList';
import { Fragment } from 'react';

function GroupList() {
  const { groups, openedGroupId } = useGroupContext();

  return (
    <StyledGroupList isEmpty={!groups?.length}>
      {groups?.length ? (
        groups.map((group, i) => (
          <Fragment key={group._id}>
            <GroupItem group={group} isLastGroup={groups.length - 1 === i} />
            {openedGroupId === group._id && <TILList groupId={group._id} />}
          </Fragment>
        ))
      ) : (
        <StyledGroupEmpty>
          <img src={imgSearch} alt='그룹에 참여해보세요.' />
          <Text strong paragraph size={2} lineHeight={2}>
            참여중인 그룹이 없습니다.
          </Text>
          <Text paragraph size={2}>
            그룹에 참여해보세요!
          </Text>
        </StyledGroupEmpty>
      )}
    </StyledGroupList>
  );
}

export default GroupList;

const StyledGroupList = styled.ul`
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${({ isEmpty }) => (isEmpty ? COLOR.GRAY_10 : COLOR.WHITE)};
`;

const StyledGroupEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0;
  color: ${COLOR.DARK};

  & > img {
    width: 25rem;
  }
`;
