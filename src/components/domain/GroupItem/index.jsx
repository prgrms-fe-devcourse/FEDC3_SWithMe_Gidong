import { Divider, Heading, Icon, Text } from '@/components/base';
import GroupInfoModal from '@/components/domain/GroupInfoModal';

import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';

import { usersState } from '@/stores/users';
import { useRecoilValue } from 'recoil';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';
import {
  StyledGroupHeader,
  StyledGroupIcons,
  StyledGroupInfo,
  StyledGroupTitle,
  StyledTag,
  StyledTagList,
  StyledToggleButton,
} from './styles';

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

  const users = useRecoilValue(usersState);
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
          <Heading level={6} color={COLOR.DARK}>
            {name}
          </Heading>
          {isOpened && (
            <StyledGroupIcons>
              <Icon name='circle-info' size='medium' onClick={() => setGroupInfoModalVisible(true)} />
              {isMaster && (
                <Icon name='gear' size='medium' onClick={() => navigate('/manageGroup', { state: group })} />
              )}
            </StyledGroupIcons>
          )}
        </StyledGroupTitle>
        {!isOpened && master && (
          <>
            <div>
              <Text color={COLOR.GRAY_30} size='large'>
                <i className='fa-solid fa-crown'></i> {master.fullName}
              </Text>
              <Divider type='vertical' />
              <Text color={COLOR.GRAY_30} size='large' weight={300}>
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
  );
}

export default GroupItem;
