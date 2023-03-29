import { imgSearch } from '@/assets/images';
import { Empty, Spinner } from '@/components/base';
import GroupItem from '@/components/domain/GroupItem';
import TILList from '@/components/domain/TILList';
import { useAuthContext } from '@/context/AuthProvider';
import { COLOR } from '@/styles/color';
import { Fragment, useEffect, useState } from 'react';
import { useGetGroupList } from '@/hooks/queries/group';
import { StyledGroupList } from './styles';
import { setItem, getItem } from '@/utils/sessionStorage';

function GroupList() {
  const groupList = useGetGroupList();
  const [openedGroupId, setOpenedGroupId] = useState(getItem('openedGroupId'));
  const {
    authState: { loggedUser },
  } = useAuthContext();
  const [myGroupList, setMyGroupList] = useState([]);

  useEffect(() => {
    setItem('openedGroupId', openedGroupId);
  }, [openedGroupId]);

  useEffect(() => {
    setMyGroupList(
      groupList.data?.filter(
        ({ description }) =>
          description.master === loggedUser._id || description.member.some((el) => el === loggedUser._id),
      ),
    );
  }, [groupList.data]);

  return (
    <>
      {groupList.isLoading ? (
        <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
      ) : (
        <StyledGroupList isEmpty={!myGroupList?.length}>
          {myGroupList?.length ? (
            myGroupList.map((group, i) => (
              <Fragment key={group._id}>
                <GroupItem
                  group={group}
                  isLastGroup={myGroupList.length - 1 === i}
                  openedGroupId={openedGroupId}
                  setOpenedGroupId={setOpenedGroupId}
                />
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
