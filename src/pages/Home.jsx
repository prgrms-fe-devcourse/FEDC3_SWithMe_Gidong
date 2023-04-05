import { getPostListByChannel } from '@/api/post';
import { imgHomeIllust } from '@/assets/images';
import { Button, Divider, Text } from '@/components/base';
import TILItem from '@/components/domain/TILItem';
import { useGetGroupList } from '@/hooks/queries/group';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [allTILs, setAllTILs] = useState([]);
  const getTILsByGroup = useCallback(async (groupId) => {
    return await getPostListByChannel(groupId);
  }, []);
  const TILTemp = useRef([]);
  const [isSortByLike, setIsSortByLike] = useState(true);
  const { data: groupList } = useGetGroupList();

  useEffect(() => {
    let ignore = false;
    if (groupList) {
      (async () => {
        for await (const group of groupList) {
          const data = await getTILsByGroup(group._id);
          if (!ignore) TILTemp.current.push(...data);
        }
        if (!ignore) setAllTILs((prev) => [...prev, ...TILTemp.current]);
      })();
    }
    return () => {
      ignore = true;
    };
  }, [groupList]);

  const filterTILList = () => {
    const filtered = isSortByLike
      ? allTILs.sort((a, b) => b.likes.length - a.likes.length || new Date(b.createdAt) - new Date(a.createdAt))
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
          <Text paragraph size='huge' weight={600} color={COLOR.WHITE}>
            그룹을 생성하여 TIL을 공유하고,
            <br /> 서로 피드백을 나누자!
          </Text>
          <Text paragraph size='xLarge' weight={300} color={COLOR.WHITE}>
            함께 공부해요. 스터디 윗미, 스윗미!
          </Text>
          <Button version='main' size='large' shape='round' onClick={() => navigate('/myGroup')}>
            내 그룹 보러가기
          </Button>
        </StyledInfo>
        <img src={imgHomeIllust} alt='' />
      </StyledHeader>
      <div>
        <StyledViewType>
          <StyledFilterButton isActive={isSortByLike} onClick={() => setIsSortByLike(true)}>
            인기 TIL
          </StyledFilterButton>
          <Divider type='vertical' height='2rem' />
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
  align-items: flex-start;
  gap: 2rem;
  padding: 10rem;

  @media (max-width: 624px) {
    padding: 10rem 4rem;
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
  align-items: center;
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
