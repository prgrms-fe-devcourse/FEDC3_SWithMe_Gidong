import { GroupDelete, ManageMember, UpdateGroupInfo } from '@/components/domain/ManageGroup';
import { useUserContext } from '@/context/UserProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ManageGroup() {
  const { state } = useLocation();
  const { users } = useUserContext();
  const [group, setGroup] = useState(state);
  const [member, setMember] = useState();

  useEffect(() => {
    const getMemberInfo = (members) => {
      return users?.filter((user) => members.includes(user._id));
    };
    if (group && users) {
      setMember(getMemberInfo(group.description.member));
    }
  }, [group, users]);

  if (!group) return;

  return (
    <StyledPageWrapper>
      <StyledManageGroup>
        <UpdateGroupInfo group={group} setGroup={setGroup} />
        <ManageMember group={group} setGroup={setGroup} member={member} />
        <GroupDelete groupId={group._id} />
      </StyledManageGroup>
    </StyledPageWrapper>
  );
}

export default ManageGroup;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledManageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  position: relative;
  flex: 1;
  padding: 10rem;
  background-color: ${COLOR.MY_GROUP_BG};
`;
