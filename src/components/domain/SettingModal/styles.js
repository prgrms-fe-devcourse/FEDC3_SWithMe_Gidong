import { Button, Modal } from '@/components/base';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

export { StyledSettingModal, StyledSettingModalWrapper, StyledFilterTabContainer, StyledFilterTab, StyledButton };
