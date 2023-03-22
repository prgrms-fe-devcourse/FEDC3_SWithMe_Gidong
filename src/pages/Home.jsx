import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { Text, Divider } from '@/components/base';
import { imgHomeIllust } from '@/assets/images';
import TILItem from '@/components/domain/TILItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useGroupContext } from '@/context/GroupProvider';
import { getPostListByChannel } from '@/api/post';
import { css } from '@emotion/react';

function Home() {
  const navigate = useNavigate();
  const { groups } = useGroupContext();
  const [allTILs, setAllTILs] = useState([]);
  const getTILsByGroup = useCallback(async (groupId) => {
    return await getPostListByChannel(groupId);
  }, []);
  const TILTemp = useRef([]);
  const [isSortByLike, setIsSortByLike] = useState(true);

  useEffect(() => {
    let ignore = false;
    if (groups.value) {
      (async () => {
        for await (const group of groups.value) {
          const data = await getTILsByGroup(group._id);
          if (!ignore) TILTemp.current.push(...data);
        }
        if (!ignore) setAllTILs((prev) => [...prev, ...TILTemp.current]);
      })();
    }
    return () => {
      ignore = true;
    };
  }, [groups]);

  const filterTILList = () => {
    const filtered = isSortByLike
      ? allTILs.sort((a, b) => {
          if (a.likes.length < b.likes.length) return 1;
          if (a.likes.length > b.likes.length) return -1;
          if (new Date(b.createdAt) > new Date(a.createdAt)) return 1;
          if (new Date(b.createdAt) < new Date(a.createdAt)) return -1;
          return 0;
        })
      : allTILs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <StyledTILWrapper>
        {filtered.slice(0, 5).map((til) => (
          <TILItem key={til._id} til={til} />
        ))}
      </StyledTILWrapper>
    );
  };

  return (
    <StyledHome>
      <StyledHeader>
        <StyledInfo>
          <Text paragraph strong size={3.4} lineHeight={1.2}>
            그룹을 생성하여 TIL을 공유하고,
            <br /> 서로 피드백을 나누자!
          </Text>
          <Text paragraph size={2.2} weight={300}>
            함께 공부해요. 스터디 윗미, 스윗미!
          </Text>
          <button onClick={() => navigate('/myGroup')}>내 그룹 보러가기</button>
        </StyledInfo>
        <img src={imgHomeIllust} alt='' />
      </StyledHeader>
      <div>
        <StyledViewType>
          <StyledFilterButton isActive={isSortByLike} onClick={() => setIsSortByLike(true)}>
            인기 TIL
          </StyledFilterButton>
          <Divider type='vertical' color={COLOR.GRAY_30} height={2} size={1.2} />
          <StyledFilterButton isActive={!isSortByLike} onClick={() => setIsSortByLike(false)}>
            최신 TIL
          </StyledFilterButton>
        </StyledViewType>
        {filterTILList()}
      </div>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 8rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  padding-top: 10rem;
  background: linear-gradient(10deg, #fff6b7 0%, #f6416c 100%);
  border-radius: 0 0 20rem 3rem;
  color: ${COLOR.WHITE};

  & > img {
    height: 35rem;
    margin-right: 20rem;
  }
  & > img {
    @media (max-width: 1150px) {
      display: none;
    }
  }
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  flex: 1 0 40rem;

  min-width: 45rem;
  /* width: fit-content; */
  padding: 10rem;

  & > p {
    min-width: 45rem;
  }

  @media (max-width: 624px) {
    padding: 10rem 4rem;
  }

  & > button {
    width: fit-content;
    padding: 1.5rem;
    border-radius: 3rem;
    background-color: #f6416c;
    font-size: 1.6rem;
    color: white;
  }
`;

const StyledTILWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24rem);
  gap: 3rem 0;
  padding: 1rem;

  justify-content: center;
  justify-items: center;
  align-items: center;

  padding: 0 10rem;
  margin: 0 auto;
  max-width: 150rem;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: smoothAppear 1s;
`;

const StyledViewType = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 2rem 0 3rem 10rem;
`;

const StyledFilterButton = styled.div`
  font-size: 2.2rem;
  color: ${COLOR.GRAY_30};

  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 600;
      color: ${COLOR.DARK};
    `};
  cursor: pointer;
`;
