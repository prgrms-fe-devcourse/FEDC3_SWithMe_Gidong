import { Header, Text } from '@/components/base';
import * as S from '@/components/domain/ManageGroup/styles';
import { useGroupContext } from '@/context/GroupProvider';
import { useToastContext } from '@/context/ToastProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const TOAST_MESSAGE = {
  ALERT_GROUP_DELETE: '그룹이 삭제되었습니다.',
  CONFIRM_GROUP_DELETE: '정말 그룹을 삭제하시겠습니까?',
};

function GroupDelete({ groupId }) {
  const { onDeleteGroup } = useGroupContext();
  const { addToast } = useToastContext();
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (!confirm(TOAST_MESSAGE.CONFIRM_GROUP_DELETE)) return;
    await onDeleteGroup({
      id: groupId,
    });
    addToast(TOAST_MESSAGE.ALERT_GROUP_DELETE);
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

const StyledGroupDelete = styled(S.GroupBox)`
  background-color: ${COLOR.MY_GROUP_BOX_BG};

  & > h3 {
    border-bottom: 1px solid ${COLOR.RED_20};
    color: ${COLOR.RED_20};
  }

  & > p {
    padding: 1rem 0;
  }
`;

const StyledDeleteButton = styled(S.Button)`
  margin-top: 1rem;
  background-color: ${COLOR.RED_20};
`;
