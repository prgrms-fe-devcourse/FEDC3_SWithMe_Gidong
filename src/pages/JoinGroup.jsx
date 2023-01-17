import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Header, Image, Text, Icon } from '@/components/base';
import { icCrown } from '@/assets/icons';
import { imgUserAvatar } from '@/assets/images';
import { useAuthContext } from '@/context/AuthProvider';
import { joinChannel } from '@/api/channel';

function JoinGroup() {
  const {
    state: { group },
  } = useLocation();
  const { name, description } = group;
  const { master, tagList, intro, headCount, member } = description;
  const {
    authState: { loggedUser },
  } = useAuthContext();

  const handleJoinClick = () => {
    member.push(loggedUser);
    group.description = JSON.stringify(description);
    joinChannel(group);
  };

  return (
    <StyledJoinGroup>
      <StyledHeader>
        <Header strong level={1} size={40} color={COLOR.WHITE}>
          {name}
        </Header>
        <StyledMaster>
          <Image src={icCrown} width={5} alt='' />
          <Image src={master.image ? master.image : imgUserAvatar} width={4} alt='' />
          <Text strong size={2.4}>
            {master.fullName}
          </Text>
        </StyledMaster>
        <div>
          <Icon name='user' size={2} style={{ marginRight: '1rem' }} />
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
      </StyledHeader>
      <StyledBody>
        <Text paragraph size={1.8}>
          {intro}
        </Text>
      </StyledBody>
      <StyledButton onClick={() => handleJoinClick()}>그룹 가입하기</StyledButton>
    </StyledJoinGroup>
  );
}

export default JoinGroup;

const StyledJoinGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  width: 100%;
  height: 43rem;
  padding-top: 11rem;
  background: linear-gradient(135deg, ${COLOR.JOIN_GROUP_GRADIENT_LEFT} 0%, ${COLOR.JOIN_GROUP_GRADIENT_RIGHT} 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};
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
`;
