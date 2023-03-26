import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Heading, Image, Text, Icon } from '@/components/base';
import { icCrown } from '@/assets/icons';
import { imgUserAvatar } from '@/assets/images';
import { useAuthContext } from '@/context/AuthProvider';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useGroupContext } from '@/context/GroupProvider';
import { imgJoin } from '@/assets/images';

const DISABLED_MESSAGE = {
  NEED_LOGIN: '로그인이 필요한 서비스입니다.',
  FULL_MEMBER: '그룹의 정원이 모두 찼습니다.',
  ALREADY_JOINED: '이미 가입된 그룹입니다.',
};

function JoinGroup() {
  const {
    state: { group },
  } = useLocation();
  const { name, description } = group;
  const { master, tagList, intro, headCount, member } = description;
  const {
    authState: { isLoggedIn, loggedUser },
  } = useAuthContext();
  const [guideMessage, setGuideMessage] = useState('');
  const { onUpdateGroup } = useGroupContext();
  const navigate = useNavigate();

  const handleJoinClick = async () => {
    const data = {
      ...group,
      description: JSON.stringify({
        ...description,
        member: [...member, loggedUser._id],
      }),
    };
    await onUpdateGroup(data);
    navigate('/myGroup');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
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
          <Image src={icCrown} width={5} alt='' />
          <Image src={master.image ? master.image : imgUserAvatar} width={4} alt='' />
          <Text strong size={2.4}>
            {master.fullName}
          </Text>
        </StyledMaster>
        <div>
          <Icon name='user' size='medium' style={{ marginRight: '1rem' }} />
          <Text strong size={2.4}>
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
        <Text paragraph size={1.8}>
          {intro}
        </Text>
      </StyledBody>
      <StyledButton disabled={guideMessage !== ''} guideMessage={guideMessage} onClick={() => handleJoinClick()}>
        그룹 가입하기
      </StyledButton>
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
  height: 43rem;
  padding-top: 11rem;
  background: linear-gradient(135deg, ${COLOR.JOIN_GROUP_GRADIENT_LEFT} 0%, ${COLOR.JOIN_GROUP_GRADIENT_RIGHT} 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};

  & > img {
    position: absolute;
    bottom: 1rem;
    right: 10rem;
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
  column-gap: 1rem;
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
`;

const StyledButton = styled.button`
  padding: 1rem;
  border-radius: 0.6rem;
  background-color: ${COLOR.JOIN_GROUP_BTN_BG};
  color: ${COLOR.WHITE};
  font-size: 1.8rem;
  &:hover {
    opacity: 0.9;
  }

  ${({ guideMessage }) =>
    guideMessage !== '' &&
    css`
      background-color: ${COLOR.GRAY_30};
      cursor: not-allowed;
      &:hover {
        opacity: 1;
      }
    `};
`;
