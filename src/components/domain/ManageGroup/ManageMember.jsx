import { Header, Icon, SearchBar } from '@/components/base';
import { Member, MemberList } from '@/components/domain/groupInfo';
import { useGroupContext } from '@/context/GroupProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { StyledGroupBox, StyledGroupInfo } from '@/pages/ManageGroup';

const ALERT_MESSAGE = {
  MEMBER_KICK: '이 강퇴 되었습니다.',
  MASTER_DELEGATE: '이 방장이 되었습니다.',
};

const CONFIRM_MESSAGE = {
  MEMBER_KICK: '을 정말 강퇴하시겠습니까?',
  MASTER_DELEGATE: '에게 방장을 위임하시겠습니까?',
};

function ManageMember({ member }) {
  const { onUpdateGroup } = useGroupContext();
  const { value, onChange } = useInput('');

  const handleKickClick = async (member) => {
    const { fullName, _id } = member;
    if (!confirm(`'${fullName}'님${CONFIRM_MESSAGE.MEMBER_KICK}`)) return false;
    const data = {
      ...group,
      description: JSON.stringify({
        ...group.description,
        member: group.description.member.filter((memberId) => memberId !== _id),
      }),
    };
    const updatedGroup = await onUpdateGroup(data);
    setGroup(updatedGroup);
    addToast(`'${fullName}님'${ALERT_MESSAGE.MEMBER_KICK}`);
  };

  const handleDelegateClick = async (member) => {
    const { fullName, _id } = member;
    if (!confirm(`'${fullName}'님${CONFIRM_MESSAGE.MASTER_DELEGATE}`)) return false;
    const data = {
      ...group,
      description: JSON.stringify({
        ...group.description,
        master: _id,
        member: [...group.description.member.filter((memberId) => memberId !== _id), group.description.master],
      }),
    };
    const updatedGroup = await onUpdateGroup(data);
    setGroup(updatedGroup);
    addToast(`'${fullName}님'${ALERT_MESSAGE.MASTER_DELEGATE}`);
    navigate('/myGroup');
  };

  return (
    <StyledManageMember>
      <Header level={3} size={25}>
        그룹원 관리
      </Header>
      <StyledGroupInfo>
        <SearchBar
          placeholder='찾고 싶은 그룹원의 이름을 검색하세요.'
          value={value}
          onChange={onChange}
          iconProps={{ size: 2, style: { color: `${COLOR.DARK}` } }}
          style={{ fontSize: '1.8rem', fontWeight: 100, borderBottom: `0.1rem solid ${COLOR.GRAY}` }}
        />
      </StyledGroupInfo>
      <MemberList>
        {member &&
          member
            .filter(({ fullName }) => fullName.includes(value))
            .map((member) => {
              return (
                <Member key={member._id} image={member.image} fullName={member.fullName}>
                  <div>
                    <Icon name='right-to-bracket' size={2} onClick={() => handleKickClick(member)} />
                    <Icon name='crown' size={2} onClick={() => handleDelegateClick(member)} />
                  </div>
                </Member>
              );
            })}
      </MemberList>
    </StyledManageMember>
  );
}

export default ManageMember;

const StyledManageMember = styled(StyledGroupBox)`
  & > div {
    overflow-y: auto;
  }

  & i {
    color: ${COLOR.PRIMARY_BTN};
    &:hover {
      color: ${COLOR.WHITE};
      cursor: pointer;
    }
  }
`;
