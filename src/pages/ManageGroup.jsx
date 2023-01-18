import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Header, TagInput, Textarea, Input, Text } from '@/components/base';
import useInput from '@/hooks/useInput';
import { useRef } from 'react';
import { useGroupContext } from '@/context/GroupProvider';

const CONFIRM_MESSAGE = '정말 그룹을 삭제하시겠습니까?';

function ManageGroup() {
  const { state } = useLocation();
  const { _id, name, description } = state;
  const { headCount, member, tagList, intro } = description;
  const { onUpdateGroup } = useGroupContext();
  const tags = useInput(tagList);
  const groupNameInputRef = useRef('');
  const groupMemberCountInputRef = useRef(0);
  const groupIntroductionInputRef = useRef('');
  const { onDeleteGroup } = useGroupContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...state,
      name: groupNameInputRef.current,
      description: JSON.stringify({
        ...description,
        headCount: groupMemberCountInputRef.current,
        tagList: tags.value,
        intro: groupIntroductionInputRef.current,
      }),
    };
    await onUpdateGroup(data);
  };

  const handleDeleteClick = async () => {
    if (!confirm(CONFIRM_MESSAGE)) return;
    await onDeleteGroup({
      id: _id,
    });
  };

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
            <Input type='text' defaultValue={name} max={15} block required ref={groupNameInputRef} />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              최대 인원
            </Text>
            <Input
              type='number'
              block
              label={`현재 ${member.length + 1}명 / 최대 50명`}
              defaultValue={headCount}
              min={member.length + 1}
              max={50}
              required
              ref={groupMemberCountInputRef}
            />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              태그
            </Text>
            <TagInput initialTagList={tags.value} onChange={(tagList) => tags.onChange(tagList)} />
          </StyledGroupInfo>
          <StyledGroupInfo>
            <Text block size={2}>
              소개
            </Text>
            <Textarea
              defaultValue={intro}
              placeholder='그룹을 소개하는 글을 작성해주세요.'
              max={300}
              wrapperProps={{ style: { width: '100%' } }}
              ref={groupIntroductionInputRef}
            />
          </StyledGroupInfo>
          <StyledButton onClick={handleSubmit}>수정</StyledButton>
        </StyledGroupBox>
        <StyledGroupDelete>
          <Header level={3} size={25}>
            그룹 삭제
          </Header>
          <Text paragraph strong size={1.6}>
            한번 그룹을 삭제하면 다시 되돌릴 수 없습니다.
          </Text>
          <StyledDeleteButton onClick={handleDeleteClick}>삭제</StyledDeleteButton>
        </StyledGroupDelete>
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

const StyledGroupBox = styled.div`
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

const StyledGroupInfo = styled.div`
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

const StyledButton = styled.button`
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

const StyledGroupDelete = styled(StyledGroupBox)`
  background-color: ${COLOR.MY_GROUP_BOX_BG};

  & > h3 {
    border-bottom: 1px solid ${COLOR.RED_20};
    color: ${COLOR.RED_20};
  }

  & > p {
    padding: 1rem 0;
  }
`;

const StyledDeleteButton = styled(StyledButton)`
  margin-top: 1rem;
  background-color: ${COLOR.RED_20};
`;
