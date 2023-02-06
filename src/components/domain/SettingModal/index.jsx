import { Button, Divider, Modal } from '@/components/base';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
        <Divider type='horizontal' color={COLOR.GRAY_30} color={COLOR.GRAY} height={0.05} size={1} />
        <StyledButton as='span' onClick={handleReadAll}>
          전체 읽음 처리
        </StyledButton>
      </StyledSettingModalWrapper>
    </StyledSettingModal>
  );
}

export default SettingModal;

const StyledSettingModal = styled(Modal)`
  padding: 0;
  position: absolute;
  top: 9rem;
  right: 34rem;
  transform: none;
  z-index: 3000;
  width: 12rem;

  @media (max-width: 624px) {
    position: fixed;
    top: 2rem;
    right: none;
    left: 8rem;
  }
`;

const StyledSettingModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
`;

const StyledFilterTabContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 1.4rem;
  min-height: 4rem;
  gap: 0.3rem;
`;

const StyledFilterTab = styled.div`
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 0.6rem;

  ${({ isClicked }) =>
    isClicked &&
    css`
      color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
      font-weight: 700;
    `};

  &:hover {
    background-color: ${COLOR.MY_GROUP_BOX_BG};
    color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
  }
`;

const StyledButton = styled(Button)`
  background-color: transparent;
  font-size: 1.4rem;
  padding: 0.3rem 1rem;

  &:hover {
    text-decoration: underline;
  }
`;
