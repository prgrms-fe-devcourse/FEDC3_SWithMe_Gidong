import { Button, Icon, Input, TagInput, Text, Textarea } from '@/components/base';

import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';

import useInput from '@/hooks/useInput';
import useToasts from '@/hooks/useToasts';

import { useState } from 'react';

import { StyledButtonContainer, StyledContentContainer, StyledHeaderContainer, StyledModal } from './styles';

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
  const { addToast } = useToasts();

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
        <Text>
          STEP {step} / {MAX_STEP_SIZE}
        </Text>
        <Icon size='large' isPointer={true} onClick={onClose} />
      </StyledHeaderContainer>
      {visible && (
        <StyledContentContainer>
          {step === 1 ? (
            <>
              <Text size='huge' weight={300}>
                우리 그룹의 이름은
              </Text>
              <Input value={groupName.value} onChange={groupName.onChange} max={15} block required fontSize='large' />
              <Text size='huge' weight={300}>
                입니다.
              </Text>
            </>
          ) : step === 2 ? (
            <>
              <Text size='huge' weight={300}>
                우리 그룹은
              </Text>
              <span>
                <Text size='huge' weight={300}>
                  최대
                </Text>
                <Input
                  type='number'
                  label='최대 50명'
                  value={headCount.value}
                  onChange={headCount.onChange}
                  max={50}
                  required
                  fontSize='large'
                  size='medium'
                />
                <Text size='huge' weight={300}>
                  명까지예요.
                </Text>
              </span>
            </>
          ) : step === 3 ? (
            <>
              <Text size='huge' weight={300}>
                우리는 이런 그룹이에요.
              </Text>
              <Textarea
                value={intro.value}
                onChange={intro.onChange}
                placeholder='그룹을 소개하는 글을 작성해주세요.'
                max={300}
              />
            </>
          ) : (
            <>
              <Text size='huge' weight={300}>
                마지막 단계입니다!
              </Text>
              <Text size='huge' weight={300}>
                그룹의 태그를 추가해주세요.
              </Text>
              <TagInput tagList={tagList.value} onChange={tagList.onChange} />
            </>
          )}
        </StyledContentContainer>
      )}
      <StyledButtonContainer>
        <Button fontSize='large' version='grayInverted' size='full' shape='round' onClick={handlePrevButtonClick}>
          이전
        </Button>
        <Button fontSize='large' version='primary' size='full' shape='round' onClick={handleNextButtonClick}>
          {step === MAX_STEP_SIZE ? '완료' : '다음'}
        </Button>
      </StyledButtonContainer>
    </StyledModal>
  );
}

export default CreateGroupModal;
