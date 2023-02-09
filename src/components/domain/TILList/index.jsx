import { imgTIL } from '@/assets/images';
import { Button, Calendar, Divider, Empty, Pagination, Spinner, Text, Icon } from '@/components/base';
import TILItem from '@/components/domain/TILItem';
import { useTILContext } from '@/context/TILProvider';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TILList({ groupId, groupName }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tils, onShowTILByGroup } = useTILContext();
  const [isSortByLike, setIsSortByLike] = useState(false);
  const [isViewByDate, setIsViewByDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const LIMIT = 8;
  const offset = currentPage * LIMIT;

  const handleShowTILsByGroup = useCallback(
    async (groupId) => {
      setIsLoading(true);
      await onShowTILByGroup(groupId);
      setIsLoading(false);
    },
    [onShowTILByGroup],
  );

  useEffect(() => {
    handleShowTILsByGroup(groupId);
  }, []);

  const filterTILList = () => {
    let filtered = tils.filter((til) => (isViewByDate ? til.createdAt.slice(0, 10) === selectedDate : true));
    if (isSortByLike) {
      filtered = filtered.sort((a, b) => b.likes.length - a.likes.length);
    }
    return filtered.length ? (
      <>
        <StyledTILWrapper>
          {filtered.slice(offset, offset + LIMIT).map((til) => (
            <TILItem key={til._id} til={til} />
          ))}
        </StyledTILWrapper>
        <Pagination limit={LIMIT} total={tils.length} onChange={setCurrentPage} />
      </>
    ) : (
      <Empty src={imgTIL} width={30} mainText='해당 날짜에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
      ) : (
        <>
          <StyledTILList>
            {tils.length ? (
              <>
                <StyledFilterWrapper>
                  <div>
                    <Text paragraph size={1.4} weight={400}>
                      전체{' '}
                      <Text strong color={COLOR.TAG_COLOR[0]}>
                        {tils.length}
                      </Text>
                      개 결과
                    </Text>
                  </div>
                  <StyledFilter>
                    <StyledViewType>
                      <StyledFilterButton isActive={!isViewByDate} onClick={() => setIsViewByDate(false)}>
                        전체 보기
                      </StyledFilterButton>
                      <Divider type='vertical' color={COLOR.GRAY_30} />
                      <StyledFilterButton isActive={isViewByDate} onClick={() => setIsViewByDate(true)}>
                        날짜 보기
                      </StyledFilterButton>
                      {isViewByDate && <Calendar onChange={setSelectedDate} />}
                    </StyledViewType>
                    <StyledViewType>
                      <StyledFilterButton isActive={!isSortByLike} onClick={() => setIsSortByLike(false)}>
                        최신순
                      </StyledFilterButton>
                      <Divider type='vertical' color={COLOR.GRAY_30} />
                      <StyledFilterButton isActive={isSortByLike} onClick={() => setIsSortByLike(true)}>
                        좋아요순
                      </StyledFilterButton>
                    </StyledViewType>
                  </StyledFilter>
                </StyledFilterWrapper>
                {filterTILList()}
              </>
            ) : (
              <Empty src={imgTIL} width={30} mainText='그룹에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
            )}
            <StyledButtonWrapper>
              <Link to='/writeTIL' state={{ groupName, groupId }}>
                <Button
                  as='button'
                  bgcolor={COLOR.PRIMARY_BTN}
                  color={COLOR.WHITE}
                  style={{ fontSize: '2.2rem', padding: '1.3rem 1.6rem', margin: '2rem', borderRadius: '1rem' }}
                  round={+true}>
                  <Icon name='circle-plus' style={{ marginRight: '1rem' }} />
                  TIL 작성하기
                </Button>
              </Link>
            </StyledButtonWrapper>
          </StyledTILList>
        </>
      )}
    </>
  );
}

export default TILList;

const StyledTILList = styled.div`
  border-bottom: 0.1rem solid ${COLOR.GRAY_10};
`;

const StyledTILWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 24rem);
  gap: 3rem 0;
  padding: 1rem;

  justify-content: center;
  justify-items: center;
  align-items: center;
  margin: 0 auto;
  max-width: 100rem;

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

const StyledFilterWrapper = styled.div`
  margin: 0 1rem 1rem 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.1rem solid ${COLOR.GRAY_10};
`;

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 0.5rem;

  & button {
    width: fit-content;
    white-space: nowrap;
    padding: 0;
  }
`;

const StyledViewType = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFilterButton = styled.div`
  font-size: 1.3rem;
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 600;
    `};
  cursor: pointer;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
