import { Button, Icon, Input, Modal, TagInput, Text, Textarea } from '@/components/base';
import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';
import { useToastContext } from '@/context/ToastProvider';
import useInput from '@/hooks/useInput';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState } from 'react';

const MAX_STEP_SIZE = 4;
const STEPS = {
  1: {
    MIN: 1,
    ERROR_MESSAGE: '그룹 이름은 타 그룹과 중복되지 않는 1글자 이상이어야 합니다.',
  },
  2: {
    MIN: 2,
    ERROR_MESSAGE: '그룹 최대 인원은 최소 2명 이상이어야 합니다.',
  },
  4: { MIN: 1, ERROR_MESSAGE: '그룹 태그는 최소 1개 이상이어야 합니다.' },
};

function CreateGroupModal({ visible, onClose, ...props }) {
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const { onCreateGroup, groups } = useGroupContext();
  const { addToast } = useToastContext();

  const [step, setStep] = useState(1);
  const groupName = useInput('');
  const headCount = useInput('');
  const intro = useInput('');
  const tagList = useInput([]);

  const checkNextButtonClickAble = () => {
    if (step === 1) {
      return groupName.value.length >= STEPS[step].MIN && !groups.value.some(({ name }) => name === groupName.value);
    } else if (step === 2) {
      return headCount.value >= STEPS[step].MIN;
    } else if (step === 4) {
      return tagList.value.length >= STEPS[step].MIN;
    }
    return true;
  };

  const handlePrevButtonClick = () => {
    if (step === 1) {
      onClose && onClose();
    } else {
      setStep(step - 1);
    }
  };

  const handleNextButtonClick = async () => {
    if (!checkNextButtonClickAble()) {
      addToast(STEPS[step].ERROR_MESSAGE);
      return;
    }

    if (step === MAX_STEP_SIZE) {
      await onCreateGroup({
        name: groupName.value,
        description: JSON.stringify({
          master: loggedUser._id,
          headCount: headCount.value,
          tagList: tagList.value,
          intro: intro.value,
          member: [],
        }),
      });
      onClose && onClose();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <StyledModal visible={visible} onClose={onClose} style={{ ...props.style }} {...props}>
      <StyledHeaderContainer>
        <Text size={1.4} weight={400}>
          STEP {step} / {MAX_STEP_SIZE}
        </Text>
        <Icon size={4} style={{ cursor: 'pointer' }} onClick={onClose} />
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
                value={groupName.value}
                onChange={groupName.onChange}
                max={15}
                block
                required
                wrapperProps={{ style: { width: '100%' } }}
                style={{ fontSize: '3rem' }}
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
                  value={headCount.value}
                  onChange={headCount.onChange}
                  max={50}
                  required
                  wrapperProps={{ style: { width: '4rem', margin: '0 1rem' } }}
                  style={{ fontSize: '3rem' }}
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
                value={intro.value}
                onChange={intro.onChange}
                placeholder='그룹을 소개하는 글을 작성해주세요.'
                max={300}
                wrapperProps={{ style: { width: '100%' } }}
                style={{ fontSize: '1.2rem', height: '16rem' }}
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
              <TagInput tagList={tagList.value} onChange={tagList.onChange} />
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
    </StyledModal>
  );
}

export default CreateGroupModal;

const StyledModal = styled(Modal)`
  width: 50rem;
  @media (max-width: 624px) {
    width: 100%;
  }
`;

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
