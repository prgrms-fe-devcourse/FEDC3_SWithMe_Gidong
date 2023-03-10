import { imgSearch } from '@/assets/images';
import { Empty, Spinner } from '@/components/base';
import GroupItem from '@/components/domain/GroupItem';
import TILList from '@/components/domain/TILList';
import { useAuthContext } from '@/context/AuthProvider';
import { useGroupContext } from '@/context/GroupProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { Fragment, useEffect, useState } from 'react';

function GroupList() {
  const {
    groups: { value: groups, isLoading },
    openedGroupId,
  } = useGroupContext();
  const {
    authState: { loggedUser },
  } = useAuthContext();
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
        <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
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
            <Empty src={imgSearch} width={25} mainText='참여중인 그룹이 없습니다.' subText='그룹에 참여해보세요!' />
          )}
        </StyledGroupList>
      )}
    </>
  );
}

export default GroupList;

const StyledGroupList = styled.ul`
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${({ isEmpty }) => (isEmpty ? COLOR.GRAY_10 : COLOR.WHITE)};
`;
