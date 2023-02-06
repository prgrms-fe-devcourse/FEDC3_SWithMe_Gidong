import { Modal } from '@/components/base';
import styled from '@emotion/styled';

function SettingModal({ visible, onClose }) {
  return (
    <StyledSettingModal visible={visible} onClose={onClose}>
      {visible && '세팅 모달입니다유'}
    </StyledSettingModal>
  );
  // return (
  //   <div style={{ display: visible ? 'block' : 'none' }}>
  //     <StyledSettingModal>HI</StyledSettingModal>
  //   </div>
  // );
}

export default SettingModal;

const StyledSettingModal = styled(Modal)`
  z-index: 3000;
  /* position: absolute;
  top: 1rem;
  right: 1rem; */
`;
