import { icCrown } from '@/assets/icons';
import { imgDefaultAvatar, imgJoin } from '@/assets/images';

import { Button, Heading, Icon, Image, Text } from '@/components/base';

import { useUpdateGroup } from '@/hooks/queries/group';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isAuthorizedState } from '@/stores/auth';
import { userState } from '@/stores/user';
import { useRecoilValue } from 'recoil';

import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const DISABLED_MESSAGE = {
  NEED_LOGIN: '로그인이 필요한 서비스입니다.',
  FULL_MEMBER: '그룹의 정원이 모두 찼습니다.',
  ALREADY_JOINED: '이미 가입된 그룹입니다.',
};

function JoinGroup() {
  const isAuthorized = useRecoilValue(isAuthorizedState);
  const loggedUser = useRecoilValue(userState);
  const {
    state: { group },
  } = useLocation();
  const { name, description } = group;
  const { master, tagList, intro, headCount, member } = description;
  const [guideMessage, setGuideMessage] = useState('');
  const { mutate: updateGroupMutate } = useUpdateGroup();
  const navigate = useNavigate();

  const handleJoinClick = async () => {
    const data = {
      ...group,
      description: JSON.stringify({
        ...description,
        member: [...member, loggedUser._id],
      }),
    };
    updateGroupMutate(data, {
      onSuccess: () => navigate('/myGroup'),
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      setGuideMessage(DISABLED_MESSAGE.NEED_LOGIN);
      return;
    } else if (master === loggedUser._id || member.some((id) => id === loggedUser._id)) {
      setGuideMessage(DISABLED_MESSAGE.ALREADY_JOINED);
      return;
    } else if (member.length >= headCount) {
      setGuideMessage(DISABLED_MESSAGE.FULL_MEMBER);
      return;
    }
    setGuideMessage('');
  }, []);

  return (
    <StyledJoinGroup>
      <StyledHeader>
        <Heading level={1} color={COLOR.WHITE}>
          {name}
        </Heading>
        <StyledMaster>
          <Image src={icCrown} width='5rem' alt='' />
          <Image src={master.image || imgDefaultAvatar} width='4rem' alt='' />
          <Text size='xxLarge' weight={500}>
            {master.fullName}
          </Text>
        </StyledMaster>
        <div>
          <Icon name='user' size='medium' style={{ marginRight: '1rem' }} />
          <Text size='xxLarge' weight={500}>
            {member.length + 1}/{headCount}
          </Text>
        </div>
        <StyledTagList>
          {tagList.map((tag, i) => (
            <StyledTag key={tag} i={i % 4}>
              {tag}
            </StyledTag>
          ))}
        </StyledTagList>
        <img src={imgJoin} alt='' />
      </StyledHeader>
      <StyledBody>
        <Text paragraph size='large'>
          {intro}
        </Text>
      </StyledBody>
      <StyledButtonWrapper>
        <Button
          fontSize='large'
          size='full'
          version='primary'
          shape='round'
          disabled={guideMessage !== ''}
          onClick={handleJoinClick}>
          그룹 가입하기
        </Button>
      </StyledButtonWrapper>
      {guideMessage && (
        <Text paragraph color={COLOR.GRAY_30}>
          {guideMessage}
        </Text>
      )}
    </StyledJoinGroup>
  );
}

export default JoinGroup;

const StyledJoinGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 8rem;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;

  width: 100%;
  padding: 11rem 0 5rem 0;
  background: linear-gradient(135deg, ${COLOR.JOIN_GROUP_GRADIENT_LEFT} 0%, ${COLOR.JOIN_GROUP_GRADIENT_RIGHT} 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};

  & > img {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    width: 32rem;
    transform: rotate(-20deg);
  }

  @media (max-width: 850px) {
    & > img {
      display: none;
    }
  }
`;

const StyledMaster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    border-radius: 50%;
  }
`;

const StyledTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  margin: 0 12rem;
`;

const StyledTag = styled.div`
  padding: 0.5rem 0.8rem;
  border-radius: 1.2rem;
  background-color: ${({ i }) => COLOR.TAG_COLOR[i]};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLOR.WHITE};
`;

const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  width: 50rem;
  height: 30rem;

  background-color: ${COLOR.JOIN_GROUP_CONTENT_BG};
  border-radius: 10px;
  color: ${COLOR.DARK};

  @media (max-width: 623.98px) {
    margin: 0 4rem;
    width: calc(100% - 4rem);
  }
`;

const StyledButtonWrapper = styled.div`
  width: 12rem;

  @media (max-width: 623.98px) {
    margin: 0 4rem;
    width: calc(100% - 4rem);
  }
`;
