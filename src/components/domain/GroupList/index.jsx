import { imgSearch } from '@/assets/images';
import { Empty, Spinner } from '@/components/base';
import GroupItem from '@/components/domain/GroupItem';
import TILList from '@/components/domain/TILList';
import useAuth from '@/hooks/useAuth';
import { useGroupContext } from '@/context/GroupProvider';
import { COLOR } from '@/styles/color';
import { Fragment, useEffect, useState } from 'react';
import { StyledGroupList } from './styles';

function GroupList() {
  const {
    groups: { value: groups, isLoading },
    openedGroupId,
  } = useGroupContext();
  const {
    authState: { loggedUser },
  } = useAuth();
  const [myGroupList, setMyGroupList] = useState([]);

  useEffect(() => {
    setMyGroupList(
      groups?.filter(
        ({ description }) =>
          description.master === loggedUser._id || description.member.some((el) => el === loggedUser._id),
      ),
    );
  }, [groups]);

  return (
    <>
      {isLoading ? (
        <Spinner size='xLarge' color={COLOR.TAG_COLOR[1]} />
      ) : (
        <StyledGroupList isEmpty={!myGroupList?.length}>
          {myGroupList?.length ? (
            myGroupList.map((group, i) => (
              <Fragment key={group._id}>
                <GroupItem group={group} isLastGroup={myGroupList.length - 1 === i} />
                {openedGroupId === group._id && <TILList groupId={group._id} groupName={group.name} />}
              </Fragment>
            ))
          ) : (
            <Empty
              src={imgSearch}
              imageWidth='25rem'
              mainText='참여중인 그룹이 없습니다.'
              subText='그룹에 참여해보세요!'
            />
          )}
        </StyledGroupList>
      )}
    </>
  );
}

export default GroupList;
