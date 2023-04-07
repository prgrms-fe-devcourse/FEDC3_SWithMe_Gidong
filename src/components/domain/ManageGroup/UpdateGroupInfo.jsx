import { Button, Heading, Input, TagInput, Text, Textarea } from '@/components/base';
import { useToastContext } from '@/context/ToastProvider';
import { useUpdateGroup } from '@/hooks/queries/group';
import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';
import { StyledGroupBox, StyledGroupInfo } from './styles';

const ALERT_MESSAGE = {
  GROUP_NAME: '그룹명은 한 글자 이상이어야 합니다.',
  GROUP_HEAD_COUNT_1: '그룹 인원은 최소 2명 이상이어야 합니다.',
  GROUP_HEAD_COUNT_2: '그룹의 최대 인원은 현재 그룹 인원보다 많아야 합니다.',
  GROUP_TAG: '태그는 최소 1개 이상이어야 합니다.',
  GROUP_UPDATE: '그룹 정보가 수정되었습니다.',
};

function UpdateGroupInfo({ group, setGroup }) {
  const { headCount: memberCount, tagList: tags, intro: introduction } = group.description;
  const { mutate: updateGroupMutate } = useUpdateGroup();
  const { addToast } = useToastContext();
  const groupName = useInput('');
  const headCount = useInput(0);
  const intro = useInput('');
  const tagList = useInput([]);
  const [isInfoChanged, setIsInfoChanged] = useState(false);

  useEffect(() => {
    groupName.onChange(group.name);
    headCount.onChange(memberCount);
    intro.onChange(introduction);
    tagList.onChange(tags);
  }, [group]);

  useEffect(() => {
    if (
      groupName.value !== group.name ||
      headCount.value !== memberCount ||
      intro.value !== introduction ||
      JSON.stringify(tagList.value) !== JSON.stringify(tags)
    ) {
      setIsInfoChanged(true);
      return;
    }
    setIsInfoChanged(false);
  }, [groupName, headCount, intro, tagList]);

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
    return true;
  };

  const handleSubmit = async () => {
    if (!inputValidate()) return false;

    const data = {
      ...group,
      name: groupName.value,
      description: JSON.stringify({
        ...group.description,
        headCount: headCount.value,
        tagList: tagList.value,
        intro: intro.value,
      }),
    };
    updateGroupMutate(data, {
      onSuccess: (data) => {
        const updatedGroup = { ...data, description: JSON.parse(data.description) };
        setGroup(updatedGroup);
        addToast(ALERT_MESSAGE.GROUP_UPDATE);
      },
    });
  };

  return (
    <StyledGroupBox>
      <Heading level={5}>그룹 정보 관리</Heading>
      <StyledGroupInfo>
        <Text block size='xLarge'>
          그룹명
        </Text>
        <Input value={groupName.value} onChange={groupName.onChange} max={15} block required />
      </StyledGroupInfo>
      <StyledGroupInfo>
        <Text block size='xLarge'>
          최대 인원
        </Text>
        <Input
          type='number'
          block
          label='최대 2~50명'
          value={headCount.value}
          onChange={headCount.onChange}
          max={50}
          required
        />
      </StyledGroupInfo>
      <StyledGroupInfo>
        <Text block size='xLarge'>
          태그
        </Text>
        <TagInput tagList={tagList.value} onChange={tagList.onChange} />
      </StyledGroupInfo>
      <StyledGroupInfo>
        <Text block size='xLarge'>
          소개
        </Text>
        <Textarea
          value={intro.value}
          onChange={intro.onChange}
          placeholder='그룹을 소개하는 글을 작성해주세요.'
          max={300}
        />
      </StyledGroupInfo>
      <Button size='large' version='primary' shape='round' disabled={!isInfoChanged} onClick={handleSubmit}>
        수정
      </Button>
    </StyledGroupBox>
  );
}

export default UpdateGroupInfo;
