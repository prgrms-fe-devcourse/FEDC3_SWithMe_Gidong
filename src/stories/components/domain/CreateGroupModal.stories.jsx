import { useState } from 'react';
import CreateGroupModal from '@/components/domain/createGroupModal';

export default {
  title: 'Components/CreateGroupModal',
  component: CreateGroupModal,
};

export function Default() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show CreateGroupModal</button>
      <CreateGroupModal visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
}
