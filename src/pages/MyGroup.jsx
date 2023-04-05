import { imgPuzzle } from '@/assets/images';
import { Heading, Image, Text } from '@/components/base';
import CreateGroupModal from '@/components/domain/CreateGroupModal';
import GroupList from '@/components/domain/GroupList';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useGetGroupList } from '@/hooks/queries/group';
import { useAuthContext } from '@/context/AuthProvider';

function MyGroup() {
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const groupList = useGetGroupList();
  const [myGroupList, setMyGroupList] = useState([]);
  const {
    authState: { loggedUser },
  } = useAuthContext();

  useEffect(() => {
    setMyGroupList(
      groupList.data?.filter(
        ({ description }) =>
          description.master === loggedUser._id || description.member.some((el) => el === loggedUser._id),
      ),
    );
  }, [groupList.data]);

  return (
    <StyledPageWrapper>
      <StyledMyGroup>
        <StyledHeader>
          <Heading level={4}>내 그룹</Heading>
          <button onClick={() => setCreateGroupModalVisible(true)}>
            <i className='fa-solid fa-circle-plus'></i>
            그룹 만들기
          </button>
          {createGroupModalVisible && (
            <CreateGroupModal
              visible={createGroupModalVisible}
              groups={groupList.data}
              setMyGroupList={setMyGroupList}
              onClose={() => setCreateGroupModalVisible(false)}
            />
          )}
        </StyledHeader>
        <StyledDesc>
          <div>
            <Text paragraph color={COLOR.DARK} size={2.1} weight={500}>
              내가 <Text color={COLOR.TAG_COLOR[0]}>가입한 그룹의 목록</Text>입니다.
            </Text>
            <Text paragraph color={COLOR.DARK} size={2.1} weight={500}>
              그룹 내의 멤버들과 소통하며 <Text color={COLOR.TAG_COLOR[1]}>오늘의 TIL</Text>을 작성해보세요.
            </Text>
          </div>
          <Image src={imgPuzzle} width='30rem' />
        </StyledDesc>
        <GroupList myGroupList={myGroupList} isLoading={groupList.isLoading} />
      </StyledMyGroup>
    </StyledPageWrapper>
  );
}

export default MyGroup;

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledMyGroup = styled.div`
  position: relative;
  flex: 1;
  padding: 10rem;
  background-color: ${COLOR.MY_GROUP_BG};

  @media (max-width: 624px) {
    padding: 10rem 6rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    display: flex;
    align-items: center;
    column-gap: 1rem;

    padding: 1.3rem 1.6rem;
    border-radius: 1rem;

    background-color: ${COLOR.MY_GROUP_BTN_BG};
    color: ${COLOR.MY_GROUP_BTN_FONT};
    font-size: 2.2rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: ${COLOR.MY_GROUP_BTN_HOVER};
    }
  }
`;

const StyledDesc = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 3rem 0;
  padding: 3rem;
  border-radius: 1rem;
  background-color: ${COLOR.MY_GROUP_BOX_BG};
  flex-wrap: wrap;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex: 1 0 6.5rem;

    p {
      margin: 0.5rem 0;
    }
  }

  & > img {
    flex: 0;
  }

  @media (max-width: 624px) {
    & > img {
      display: none;
    }
  }
`;
