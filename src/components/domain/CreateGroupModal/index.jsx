import { Button, Input, Modal, TagInput, Text, Textarea } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import Icon from '../../base/Icon';

const MAX_STEP_SIZE = 4;
const STEPS = {
  1: {
    MIN: 1,
    ERROR_MESSAGE: '그룹 이름은 최소 1글자 이상이어야 합니다.',
  },
  2: {
    MIN: 2,
    ERROR_MESSAGE: '그룹 최대 인원은 최소 2명 이상이어야 합니다.',
  },
  4: { MIN: 1, ERROR_MESSAGE: '그룹 태그는 최소 1개 이상이어야 합니다.' },
};

function CreateGroupModal({ visible, onClose, ...props }) {
  const [step, setStep] = useState(1);
  const groupNameInputRef = useRef('');
  const groupMemberCountInputRef = useRef(0);
  const groupIntroductionInputRef = useRef('');
  const groupTagInputRef = useRef([]);

  const resetModal = () => {
    groupNameInputRef.current = '';
    groupMemberCountInputRef.current = 0;
    groupIntroductionInputRef.current = '';
    groupTagInputRef.current = [];
    setStep(1);
  };

  const handleModalClose = () => {
    onClose && onClose();
    resetModal();
  };

  const checkNextButtonClickAble = () => {
    if (step === 1) {
      return groupNameInputRef.current.length >= STEPS[step].MIN;
    } else if (step === 2) {
      return groupMemberCountInputRef.current >= STEPS[step].MIN;
    } else if (step === 4) {
      return groupTagInputRef.current.length >= STEPS[step].MIN;
    }
    return true;
  };

  const handlePrevButtonClick = () => {
    if (step === 1) {
      handleModalClose();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (!checkNextButtonClickAble()) {
      alert(STEPS[step].ERROR_MESSAGE);
      return;
    }
    if (step === MAX_STEP_SIZE) {
      // TODO: API CALL WITH BELOW DATA

      // const data = {
      //   name: groupNameInputRef.current,
      //   description: JSON.stringify({
      //     // master: User,
      //     headCount: groupMemberCountInputRef.current,
      //     tagList: groupTagInputRef.current,
      //     intro: groupMemberCountInputRef.current,
      //     // member: [User]
      //   }),
      // };
      handleModalClose();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal visible={visible} onClose={handleModalClose} width='50rem' style={{ ...props.style }} {...props}>
      <StyledHeaderContainer>
        <Text size={1.4} weight={400}>
          STEP {step} / {MAX_STEP_SIZE}
        </Text>
        <Icon size={4} style={{ cursor: 'pointer' }} onClick={handleModalClose} />
      </StyledHeaderContainer>
      {visible && (
        <StyledContentContainer>
          {step === 1 ? (
            <>
              <Text size={3} weight={300}>
                우리 그룹 이름은
              </Text>
              <Input
                type='text'
                defaultValue={groupNameInputRef.current}
                max={15}
                block
                required
                wrapperProps={{ style: { width: '100%' } }}
                style={{ fontSize: '3rem' }}
                ref={groupNameInputRef}
              />
              <Text size={3} weight={300}>
                입니다.
              </Text>
            </>
          ) : step === 2 ? (
            <>
              <Text size={3} weight={300}>
                우리 그룹은
              </Text>
              <span>
                <Text size={3} weight={300}>
                  최대
                </Text>
                <Input
                  type='number'
                  label='최대 50명'
                  defaultValue={groupMemberCountInputRef.current}
                  max={50}
                  required
                  wrapperProps={{ style: { width: '4rem', margin: '0 1rem' } }}
                  style={{ fontSize: '3rem' }}
                  ref={groupMemberCountInputRef}
                />
                <Text size={3} weight={300}>
                  명까지예요.
                </Text>
              </span>
            </>
          ) : step === 3 ? (
            <>
              <Text size={3} weight={300}>
                우리는 이런 그룹이에요.
              </Text>
              <Textarea
                defaultValue={groupIntroductionInputRef.current}
                placeholder='그룹을 소개하는 글을 작성해주세요.'
                max={300}
                wrapperProps={{ style: { width: '100%' } }}
                style={{ fontSize: '1.2rem', height: '16rem' }}
                ref={groupIntroductionInputRef}
              />
            </>
          ) : (
            <>
              <Text size={3} weight={300}>
                마지막 단계입니다!
              </Text>
              <Text size={3} weight={300}>
                그룹의 태그를 추가해주세요.
              </Text>
              <TagInput ref={groupTagInputRef} />
            </>
          )}
        </StyledContentContainer>
      )}
      <StyledButtonContainer>
        <Button
          as='button'
          style={{ fontSize: '1.8rem', width: '12rem', height: '4rem' }}
          round={+true}
          onClick={handlePrevButtonClick}>
          이전
        </Button>
        <Button
          as='button'
          bgcolor={COLOR.PRIMARY_BTN}
          color={COLOR.WHITE}
          style={{ fontSize: '1.8rem', width: '12rem', height: '4rem' }}
          round={+true}
          onClick={handleNextButtonClick}>
          {step === MAX_STEP_SIZE ? '완료' : '다음'}
        </Button>
      </StyledButtonContainer>
    </Modal>
  );
}

export default CreateGroupModal;

const StyledHeaderContainer = styled.div`
  padding: 0.5rem 2rem 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 30rem;
  padding: 0 15%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15% 2rem;
`;
