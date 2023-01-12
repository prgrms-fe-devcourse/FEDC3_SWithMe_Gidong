import { useState } from 'react';
import { Modal } from '@/components/base';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export function Default() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        Hi!
        <button onClick={() => setVisible(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}
