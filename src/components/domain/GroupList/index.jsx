import styled from '@emotion/styled';
import { useGroupContext } from '@/context/GroupProvider';
import GroupItem from '../GroupItem';
import { COLOR } from '@/styles/color';

function GroupList() {
  const { groups } = useGroupContext();

  return (
    <StyledGroupList>
      {groups?.map((group, i) => (
        <GroupItem key={group._id} group={group} isLastGroup={groups.length - 1 === i} />
      ))}
    </StyledGroupList>
  );
}

export default GroupList;

const StyledGroupList = styled.ul`
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.WHITE};
`;
