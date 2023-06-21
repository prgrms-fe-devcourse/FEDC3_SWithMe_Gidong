import { Button, Divider } from '@/components/base';
import * as S from './styles';

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
    <S.SettingModal visible={visible} onClose={onClose} isDimTransparent>
      <S.SettingModalWrapper>
        <S.FilterTabContainer>
          {FILTER_METHODS.map((method, i) => (
            <S.FilterTab key={method} onClick={() => handleFiltering(i)} isClicked={clickedIndex.value === i}>
              {method}
            </S.FilterTab>
          ))}
        </S.FilterTabContainer>
        <Divider type='horizontal' height='0.05rem' />
        <Button underline onClick={handleReadAll} version='transparent' fontSize='small'>
          전체 읽음 처리
        </Button>
      </S.SettingModalWrapper>
    </S.SettingModal>
  );
}

export default SettingModal;
