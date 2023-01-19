import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Text } from '@/components/base';
import { imgHomeIllust } from '@/assets/images';

function Home() {
  return (
    <StyledHome>
      <StyledHeader>
        <StyledInfo>
          <Text strong size={3.4} lineHeight={1.2}>
            그룹을 생성하여 TIL을 공유하고,
            <br /> 서로 피드백을 나누자!
          </Text>
          <Text size={2.2} weight={300}>
            함께 공부해요. 스터디 윗미, 스윗미!
          </Text>
          <button>내 그룹 보러가기</button>
        </StyledInfo>
        <img src={imgHomeIllust} alt='' />
      </StyledHeader>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 43rem;
  background: linear-gradient(10deg, #fff6b7 0%, #f6416c 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};

  & > img {
    height: 35rem;
    margin-right: 20rem;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;

  width: fit-content;
  padding: 0 0 10rem 15rem;

  & > button {
    width: fit-content;
    padding: 1.5rem;
    border-radius: 3rem;
    background-color: #f6416c;
    font-size: 1.6rem;
    color: white;
  }
`;
