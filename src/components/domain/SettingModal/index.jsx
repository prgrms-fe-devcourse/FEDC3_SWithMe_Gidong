import { Divider } from '@/components/base';
import { COLOR } from '@/styles/color';

const FILTER_METHODS = ['전체', '읽은 알림', '안읽은 알림'];

function SettingModal({ visible, onClose, clickedIndex, onReadAll }) {
  const handleFiltering = async (i) => {
    clickedIndex.onChange && (await clickedIndex.onChange(i));
    onClose && onClose();
  };

  const handleReadAll = async () => {
    onReadAll && (await onReadAll());
    onClose && onClose();
  };

  return (
    <StyledSettingModal visible={visible} onClose={onClose} dimColor='transparent'>
      <StyledSettingModalWrapper>
        <StyledFilterTabContainer>
          {FILTER_METHODS.map((method, i) => (
            <StyledFilterTab key={method} onClick={() => handleFiltering(i)} isClicked={clickedIndex.value === i}>
              {method}
            </StyledFilterTab>
          ))}
        </StyledFilterTabContainer>
        <Divider type='horizontal' height='0.05rem' />
        <StyledButton as='span' onClick={handleReadAll}>
          전체 읽음 처리
        </StyledButton>
      </StyledSettingModalWrapper>
    </StyledSettingModal>
  );
}

export default SettingModal;
