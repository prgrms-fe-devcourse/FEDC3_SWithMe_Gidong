import { Header, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { StyledGroupBox, StyledButton } from '@/pages/ManageGroup';

const ALERT_MESSAGE = {
  GROUP_DELETE: '그룹이 삭제되었습니다.',
};

const CONFIRM_MESSAGE = {
  GROUP_DELETE: '정말 그룹을 삭제하시겠습니까?',
};

function GroupDelete() {
  const handleDeleteClick = async () => {
    if (!confirm(CONFIRM_MESSAGE.GROUP_DELETE)) return;
    await onDeleteGroup({
      id: group._id,
    });
    addToast(ALERT_MESSAGE.GROUP_DELETE);
    navigate('/myGroup');
  };

  return (
    <StyledGroupDelete>
      <Header level={3} size={25}>
        그룹 삭제
      </Header>
      <Text paragraph strong size={1.6}>
        한번 그룹을 삭제하면 다시 되돌릴 수 없습니다.
      </Text>
      <StyledDeleteButton onClick={handleDeleteClick}>삭제</StyledDeleteButton>
    </StyledGroupDelete>
  );
}

export default GroupDelete;

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

const StyledDeleteButton = styled(StyledButton)`
  margin-top: 1rem;
  background-color: ${COLOR.RED_20};
`;
