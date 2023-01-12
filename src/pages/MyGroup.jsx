import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { imgPuzzle } from '@/assets/images';
import { Image, Header, Text } from '@/components/base';
import { getChannelList } from '@/api/channel';
import { useAsync } from '@/hooks';
import GroupList from '@/components/domain/GroupList';
import GroupProvider from '@/context/GroupProvider';
import TILProvider from '../context/TILProvider';

function MyGroup() {
  const initialGroups = useAsync(getChannelList, []);
  return (
    <GroupProvider initialGroups={initialGroups}>
      <TILProvider>
        <StyledPageWrapper>
          <StyledMyGroup>
            <StyledHeader>
              <Header strong size={30}>
                내 그룹
              </Header>
              <button>
                <i className='fa-solid fa-circle-plus'></i>
                그룹 만들기
              </button>
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
              <Image src={imgPuzzle} width={300} />
            </StyledDesc>
            <GroupList />
          </StyledMyGroup>
        </StyledPageWrapper>
      </TILProvider>
    </GroupProvider>
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
  padding: 8rem;
  background-color: ${COLOR.MY_GROUP_BG};
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

  height: 20rem;
  margin: 3rem 0;
  padding: 0 3rem;
  border-radius: 1rem;
  background-color: ${COLOR.MY_GROUP_BOX_BG};

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 0.5rem 0;
    }
  }
`;
