import { Divider, Header, Icon, Text } from '@/components/base';
import GroupInfoModal from '@/components/domain/GroupInfoModal';
import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';
import { useUserContext } from '@/context/UserProvider';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GroupItem({ group, isLastGroup }) {
  const [groupInfoModalVisible, setGroupInfoModalVisible] = useState(false);
  const { openedGroupId, setOpenedGroupId } = useGroupContext();
  const { _id, name, description } = group;
  const { master: masterId, tagList, intro } = description;
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const isOpened = openedGroupId === _id;
  const isMaster = masterId === loggedUser._id;
  const navigate = useNavigate();

  const { users } = useUserContext();
  const [master, setMaster] = useState();

  useEffect(() => {
    const getMasterInfo = () => {
      return [...users, loggedUser].filter((user) => user._id === masterId)[0];
    };

    if (description && users) {
      setMaster(getMasterInfo());
    }
  }, [description, users]);

  return (
    <StyledGroupItem>
      <StyledGroupHeader isOpened={isOpened} isLastGroup={isLastGroup}>
        <StyledGroupInfo>
          <StyledGroupTitle>
            {groupInfoModalVisible && (
              <GroupInfoModal
                group={group}
                visible={groupInfoModalVisible}
                onClose={() => setGroupInfoModalVisible(false)}
              />
            )}
            <Header strong level={3} color={COLOR.DARK}>
              {name}
            </Header>
            {isOpened && (
              <StyledGroupIcons>
                <Icon name='circle-info' onClick={() => setGroupInfoModalVisible(true)} />
                {isMaster && <Icon name='gear' onClick={() => navigate('/manageGroup', { state: group })} />}
              </StyledGroupIcons>
            )}
          </StyledGroupTitle>
          {!isOpened && master && (
            <>
              <div>
                <Text color={COLOR.GRAY_30} size={1.8} weight={400}>
                  <i className='fa-solid fa-crown'></i> {master.fullName}
                </Text>
                <Divider type='vertical' />
                <Text color={COLOR.GRAY_30} size={1.8} weight={300}>
                  {intro}
                </Text>
              </div>
              <StyledTagList>
                {tagList.map((tag, i) => (
                  <StyledTag key={tag} i={i % 4}>
                    {tag}
                  </StyledTag>
                ))}
              </StyledTagList>
            </>
          )}
        </StyledGroupInfo>
        <StyledToggleButton isOpened={isOpened} onClick={() => setOpenedGroupId(isOpened ? '' : _id)}>
          <i className='fa-solid fa-chevron-down'></i>
        </StyledToggleButton>
      </StyledGroupHeader>
    </StyledGroupItem>
  );
}

export default GroupItem;

const StyledGroupItem = styled.div``;

const StyledGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ isOpened }) => (isOpened ? '2rem 1rem 0 1rem' : '2rem 1rem')};
  ${({ isLastGroup, isOpened }) =>
    !isLastGroup &&
    !isOpened &&
    css`
      border-bottom: 0.1rem solid ${COLOR.GRAY_10};
    `};
  font-size: 2rem;

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 1rem;
    color: ${COLOR.GRAY_30};
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${COLOR.TAG_COLOR[1]};
    }
  }
`;

const StyledGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 2rem;
`;

const StyledGroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledGroupIcons = styled.div`
  color: ${COLOR.GRAY_30};

  & > i {
    padding-left: 1rem;
    cursor: pointer;
    &:hover {
      color: ${COLOR.TAG_COLOR[1]};
    }
  }
`;

const StyledTagList = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const StyledTag = styled.div`
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  background-color: ${({ i }) => COLOR.TAG_COLOR[i]};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLOR.WHITE};
`;

const StyledToggleButton = styled.div`
  & > i {
    transition: transform 0.3s ease-in-out;
    transform: rotateZ(0deg);
    transform: ${({ isOpened }) => isOpened && 'rotateZ(180deg)'};
  }
`;
