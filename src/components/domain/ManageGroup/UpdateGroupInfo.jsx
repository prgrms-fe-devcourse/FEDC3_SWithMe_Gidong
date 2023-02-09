import * as S from '@/components/domain/ManageGroup/styles';
import { Header, Input, TagInput, Text, Textarea } from '@/components/base';
import { useGroupContext } from '@/context/GroupProvider';
import { useToastContext } from '@/context/ToastProvider';
import useInput from '@/hooks/useInput';
import { useEffect } from 'react';

const ALERT_MESSAGE = {
  GROUP_NAME: '그룹명은 한 글자 이상이어야 합니다.',
  GROUP_HEAD_COUNT_1: '그룹 인원은 최소 2명 이상이어야 합니다.',
  GROUP_HEAD_COUNT_2: '그룹의 최대 인원은 현재 그룹 인원보다 많아야 합니다.',
  GROUP_TAG: '태그는 최소 1개 이상이어야 합니다.',
  GROUP_UPDATE: '그룹 정보가 수정되었습니다.',
};

function UpdateGroupInfo({ group, setGroup }) {
  const { onUpdateGroup } = useGroupContext();
  const { addToast } = useToastContext();
  const groupName = useInput('');
  const headCount = useInput(0);
  const intro = useInput('');
  const tagList = useInput([]);

  useEffect(() => {
    if (group) {
      const { headCount: memberCount, tagList: tags, intro: introduction } = group.description
      groupName.onChange(group.name);
      headCount.onChange(memberCount);
      intro.onChange(introduction);
      tagList.onChange(tags);
    }
  }, [group]);

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

  return (
    <S.GroupBox>
      <Header level={3} size={25}>
        그룹 정보 관리
      </Header>
      <S.GroupInfo>
        <Text block size={2}>
          그룹명
        </Text>
        <Input type='text' value={groupName.value} onChange={groupName.onChange} max={15} block required />
      </S.GroupInfo>
      <S.GroupInfo>
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
      </S.GroupInfo>
      <S.GroupInfo>
        <Text block size={2}>
          태그
        </Text>
        <TagInput tagList={tagList.value} onChange={tagList.onChange} />
      </S.GroupInfo>
      <S.GroupInfo>
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
      </S.GroupInfo>
      <S.Button onClick={handleSubmit}>수정</S.Button>
    </S.GroupBox>
  );
}

export default UpdateGroupInfo;
