import styled from '@emotion/styled';
import { useGroupContext } from '../../../context/GroupProvider';
import GroupItem from '../GroupItem/index';

function GroupList() {
  const { groups } = useGroupContext();
  console.log('groups', groups);

  return (
    <StyledGroupList>
      {groups?.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </StyledGroupList>
  );
}

export default GroupList;

const StyledGroupList = styled.ul`
  border-radius: 1rem;
  background-color: white;
`;
