import { Header, Input, TagInput, Text, Textarea } from '@/components/base';
import { useGroupContext } from '@/context/GroupProvider';
import { useToastContext } from '@/context/ToastProvider';
import { useUserContext } from '@/context/UserProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GroupDelete, ManageMember } from '@/components/domain/ManageGroup';

const ALERT_MESSAGE = {
  GROUP_NAME: '그룹명은 한 글자 이상이어야 합니다.',
  GROUP_HEAD_COUNT_1: '그룹 인원은 최소 2명 이상이어야 합니다.',
  GROUP_HEAD_COUNT_2: '그룹의 최대 인원은 현재 그룹 인원보다 많아야 합니다.',
  GROUP_TAG: '태그는 최소 1개 이상이어야 합니다.',
  GROUP_UPDATE: '그룹 정보가 수정되었습니다.',
};

function ManageGroup() {
  const {
    state: { _id },
  } = useLocation();
  const { groups, onUpdateGroup, onDeleteGroup } = useGroupContext();
  const { addToast } = useToastContext();
  const [group, setGroup] = useState();
  const groupName = useInput('');
  const headCount = useInput(0);
  const intro = useInput('');
  const tagList = useInput([]);
  const { users } = useUserContext();

  useEffect(() => {
    groups.value && setGroup(...groups.value.filter((group) => group._id === _id));
  }, [groups]);

  const [member, setMember] = useState();

  useEffect(() => {
    const getMemberInfo = (members) => {
      return users?.filter((user) => members.includes(user._id));
    };

    if (group && users) {
      const { headCount: memberCount, tagList: tags, intro: introduction, member } = group.description;
      setMember(getMemberInfo(member));
      groupName.onChange(group.name);
      headCount.onChange(memberCount);
      intro.onChange(introduction);
      tagList.onChange(tags);
    }
  }, [group, users]);

  const inputValidate = () => {
    if (groupName.value === '') {
      addToast(ALERT_MESSAGE.GROUP_NAME);
      return false;
    } else if (headCount.value < 2) {
      addToast(ALERT_MESSAGE.GROUP_HEAD_COUNT_1);
      return false;
    } else if (headCount.value < group.description.member.length + 1) {
      addToast(ALERT_MESSAGE.GROUP_HEAD_COUNT_2);
      return false;
    } else if (tagList.value.length === 0) {
      addToast(ALERT_MESSAGE.GROUP_TAG);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!inputValidate()) return false;

    const updatedGroup = await onUpdateGroup({
      ...group,
      name: groupName.value,
      description: JSON.stringify({
        ...group.description,
        headCount: headCount.value,
        tagList: tagList.value,
        intro: intro.value,
      }),
    });
    setGroup(updatedGroup);
    addToast(ALERT_MESSAGE.GROUP_UPDATE);
  };

  if (!group) return;

  return (
    <StyledPageWrapper>
      <StyledManageGroup>
        <StyledGroupBox>
          <Header level={3} size={25}>
            그룹 정보 관리
          </Header>
          <StyledGroupInfo>
            <Text block size={2}>
              그룹명
            </Text>
            <Input type='text' value={groupName.value} onChange={groupName.onChange} max={15} block required />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              최대 인원
            </Text>
            <Input
              type='number'
              block
              label={`최대 2~50명`}
              value={headCount.value}
              onChange={headCount.onChange}
              max={50}
              required
            />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              태그
            </Text>
            <TagInput tagList={tagList.value} onChange={tagList.onChange} />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              소개
            </Text>
            <Textarea
              value={intro.value}
              onChange={intro.onChange}
              placeholder='그룹을 소개하는 글을 작성해주세요.'
              max={300}
              wrapperProps={{ style: { width: '100%' } }}
            />
          </StyledGroupInfo>
          <StyledButton onClick={handleSubmit}>수정</StyledButton>
        </StyledGroupBox>
        <ManageMember member={member} />
        <GroupDelete />
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

export const StyledGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${COLOR.WHITE};

  & > h3 {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${COLOR.GRAY_10};
  }

  & > div {
    width: 45rem;
  }
`;

export const StyledGroupInfo = styled.div`
  width: 100%;
  padding: 2rem 0;

  & input {
    height: 3rem;
    font-weight: 100;
    font-size: 1.6rem;
    color: ${COLOR.DARK};
  }

  & textarea {
    height: 20rem;
    border-radius: 0.5rem;
    font-weight: 100;
    font-size: 1.6rem;
  }
`;

export const StyledButton = styled.button`
  width: 10rem;
  padding: 1rem;
  border-radius: 0.6rem;

  background-color: ${COLOR.PRIMARY_BTN};
  text-align: center;
  font-size: 1.8rem;
  color: ${COLOR.WHITE};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
