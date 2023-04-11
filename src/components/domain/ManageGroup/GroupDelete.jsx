import { Heading, Text, Button } from '@/components/base';

import useToasts from '@/hooks/useToasts';

import { useDeleteGroup } from '@/hooks/queries/group';
import { useNavigate } from 'react-router-dom';

import { StyledGroupDelete } from './styles';

const TOAST_MESSAGE = {
  ALERT_GROUP_DELETE: '그룹이 삭제되었습니다.',
  CONFIRM_GROUP_DELETE: '정말 그룹을 삭제하시겠습니까?',
};

function GroupDelete({ groupId }) {
  const navigate = useNavigate();

  const deleteGroup = useDeleteGroup();
  const { addToast } = useToasts();

  const handleDeleteClick = async () => {
    if (!confirm(TOAST_MESSAGE.CONFIRM_GROUP_DELETE)) return;
    deleteGroup.mutate(
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
      <Text paragraph size='medium' weight={600}>
        한번 그룹을 삭제하면 다시 되돌릴 수 없습니다.
      </Text>
      <Button size='large' version='red' shape='round' onClick={handleDeleteClick}>
        삭제
      </Button>
    </StyledGroupDelete>
  );
}

export default GroupDelete;
