import { Heading, Icon, SearchBar } from '@/components/base';
import { Member, MemberList } from '@/components/domain/groupInfo';

import useInput from '@/hooks/useInput';
import useToasts from '@/hooks/useToasts';

import { useNavigate } from 'react-router-dom';

import { useUpdateGroup } from '@/hooks/queries/group';
import { StyledGroupInfo, StyledManageMember } from './styles';

const MESSAGE = {
  ALERT_MEMBER_KICK: '이 강퇴 되었습니다.',
  ALERT_MASTER_DELEGATE: '이 방장이 되었습니다.',
  CONFIRM_MEMBER_KICK: '을 정말 강퇴하시겠습니까?',
  CONFIRM_MASTER_DELEGATE: '에게 방장을 위임하시겠습니까?',
};

function ManageMember({ group, setGroup, member }) {
  const navigate = useNavigate();

  const { addToast } = useToasts();
  const updateGroup = useUpdateGroup();

  const { value, onChange } = useInput('');

  const featureNames = {
    k: 'MEMBER_KICK',
    d: 'MASTER_DELEGATE',
  };

  const handleMember = async (member, feat) => {
    const confirm = `CONFIRM_${featureNames[feat]}`;
    const alert = `ALERT_${featureNames[feat]}`;
    const { fullName, _id } = member;
    if (!window.confirm(`'${fullName}'님${MESSAGE[confirm]}`)) return false;

    const updatedMember =
      feat === 'k'
        ? { member: group.description.member.filter((memberId) => memberId !== _id) }
        : {
            master: _id,
            member: [...group.description.member.filter((memberId) => memberId !== _id), group.description.master],
          };
    const data = {
      ...group,
      description: JSON.stringify({
        ...group.description,
        ...updatedMember,
      }),
    };
    updateGroup.mutate(data, {
      onSuccess: (data) => {
        const updatedGroup = { ...data, description: JSON.parse(data.description) };
        setGroup(updatedGroup);
        addToast(`'${fullName}'님${MESSAGE[alert]}`);
        feat === 'd' && navigate('/myGroup');
      },
    });
  };

  return (
    <StyledManageMember>
      <Heading level={5}>그룹원 관리</Heading>
      <StyledGroupInfo>
        <SearchBar placeholder='찾고 싶은 그룹원의 이름을 검색하세요.' value={value} onChange={onChange} />
      </StyledGroupInfo>
      <MemberList>
        {member &&
          member
            .filter(({ fullName }) => fullName.includes(value))
            .map((member) => {
              return (
                <Member key={member._id} image={member.image} fullName={member.fullName}>
                  <div>
                    <Icon name='right-to-bracket' size='medium' onClick={() => handleMember(member, 'k')} />
                    <Icon name='crown' size='medium' onClick={() => handleMember(member, 'd')} />
                  </div>
                </Member>
              );
            })}
      </MemberList>
    </StyledManageMember>
  );
}

export default ManageMember;
