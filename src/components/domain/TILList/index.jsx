import { imgTIL } from '@/assets/images';
import { Button, Calendar, Divider, Empty, Icon, Pagination, Spinner, Text } from '@/components/base';
import TILItem from '@/components/domain/TILItem';
import { useTILContext } from '@/context/TILProvider';
import { COLOR } from '@/styles/color';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledButtonWrapper,
  StyledFilter,
  StyledFilterButton,
  StyledFilterWrapper,
  StyledTILList,
  StyledTILWrapper,
  StyledViewType,
} from './styles';

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
      <Empty src={imgTIL} imageWidth='30rem' mainText='해당 날짜에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
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
                      <Divider type='vertical' />
                      <StyledFilterButton isActive={isViewByDate} onClick={() => setIsViewByDate(true)}>
                        날짜 보기
                      </StyledFilterButton>
                      {isViewByDate && <Calendar onChange={setSelectedDate} />}
                    </StyledViewType>
                    <StyledViewType>
                      <StyledFilterButton isActive={!isSortByLike} onClick={() => setIsSortByLike(false)}>
                        최신순
                      </StyledFilterButton>
                      <Divider type='vertical' />
                      <StyledFilterButton isActive={isSortByLike} onClick={() => setIsSortByLike(true)}>
                        좋아요순
                      </StyledFilterButton>
                    </StyledViewType>
                  </StyledFilter>
                </StyledFilterWrapper>
                {filterTILList()}
              </>
            ) : (
              <Empty src={imgTIL} imageWidth='30rem' mainText='그룹에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
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
