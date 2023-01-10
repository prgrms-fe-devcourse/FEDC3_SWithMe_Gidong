import styled from '@emotion/styled';
import { COLOR } from '../styles/color';
import { ImgPuzzle } from '../assets/images';
import Image from '../components/base/Image';
import Header from '../components/base/Header';
import Text from '../components/base/Text';

const tempGroupData = [
  {
    _id: 1,
    name: '개발하는 돌맹이',
    desc: '어쩌구저쩌구 공부하는 그룹입니다. 열심히 공부하실 분들만 들어오세요!',
  },
  {
    _id: 2,
    name: '개발하는 돌맹이',
    desc: '어쩌구저쩌구 공부하는 그룹입니다. 열심히 공부하실 분들만 들어오세요!',
  },
  {
    _id: 3,
    name: '개발하는 돌맹이',
    desc: '어쩌구저쩌구 공부하는 그룹입니다. 열심히 공부하실 분들만 들어오세요!',
  },
  {
    _id: 4,
    name: '개발하는 돌맹이',
    desc: '어쩌구저쩌구 공부하는 그룹입니다. 열심히 공부하실 분들만 들어오세요!',
  },
];

function MyGroup() {
  return (
    <StyledPageWrapper>
      <StyledMyGroup>
        <StyledHeader>
          <Header size={30}>내 그룹</Header>
          <button>
            <i className='fa-solid fa-circle-plus'></i>
            그룹 만들기
          </button>
        </StyledHeader>
        <StyledDesc>
          <div>
            <Text paragraph color={COLOR.DARK} size={21}>
              내가 <Text>가입한 그룹의 목록</Text>입니다.
            </Text>
            <Text paragraph color={COLOR.DARK} size={21}>
              그룹 내의 멤버들과 소통하며 <Text>오늘의 TIL</Text>을 작성해보세요.
            </Text>
          </div>
          <Image src={ImgPuzzle} width={300} />
        </StyledDesc>
        <StyledGroupList>
          {tempGroupData.map((group) => (
            <StyledGroup key={group._id}>
              <p>{group.name}</p>
              <p>{group.desc}</p>
            </StyledGroup>
          ))}
        </StyledGroupList>
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

      span {
        background: linear-gradient(#f7e9ec 0%, #c9d6ff 100%);
      }
    }
  }
`;

const StyledGroupList = styled.div`
  border-radius: 1rem;
  background-color: white;
`;

const StyledGroup = styled.div`
  padding: 10rem;
`;
