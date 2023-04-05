import { Heading, Text } from '@/components/base';
import { useToastContext } from '@/context/ToastProvider';
import { useNavigate } from 'react-router-dom';
import { StyledDeleteButton, StyledGroupDelete } from './styles';
import { useDeleteGroup } from '@/hooks/queries/group';

const TOAST_MESSAGE = {
  ALERT_GROUP_DELETE: '그룹이 삭제되었습니다.',
  CONFIRM_GROUP_DELETE: '정말 그룹을 삭제하시겠습니까?',
};

function GroupDelete({ groupId }) {
  const { addToast } = useToastContext();
  const navigate = useNavigate();
  const { mutate } = useDeleteGroup();

  const handleDeleteClick = async () => {
    if (!confirm(TOAST_MESSAGE.CONFIRM_GROUP_DELETE)) return;
    mutate(
      { id: groupId },
      {
        onSuccess: () => {
          addToast(TOAST_MESSAGE.ALERT_GROUP_DELETE);
          navigate('/myGroup');
        },
      },
    );
  };

  return (
    <StyledGroupDelete>
      <Heading level={5}>그룹 삭제</Heading>
      <Text paragraph strong size={1.6}>
        한번 그룹을 삭제하면 다시 되돌릴 수 없습니다.
      </Text>
      <StyledDeleteButton onClick={handleDeleteClick}>삭제</StyledDeleteButton>
    </StyledGroupDelete>
  );
}

export default GroupDelete;
