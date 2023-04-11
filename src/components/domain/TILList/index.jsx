import { imgTIL } from '@/assets/images';

import { Button, Calendar, Divider, Empty, Icon, Pagination, Spinner, Text } from '@/components/base';
import TILItem from '@/components/domain/TILItem';

import { useGetTILsByGroup } from '@/hooks/queries/tils';

import { COLOR } from '@/styles/color';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { data: tils, isLoading } = useGetTILsByGroup(groupId);

  const [isSortByLike, setIsSortByLike] = useState(false);
  const [isViewByDate, setIsViewByDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const LIMIT = 8;
  const offset = currentPage * LIMIT;

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
        <Spinner size='xLarge' color={COLOR.TAG_COLOR[1]} />
      ) : (
        <StyledTILList>
          {tils.length ? (
            <>
              <StyledFilterWrapper>
                <div>
                  <Text paragraph>
                    전체{' '}
                    <Text weight={600} color={COLOR.TAG_COLOR[0]}>
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
            <Button
              fontSize='xLarge'
              version='primary'
              size='medium'
              shape='round'
              onClick={() => navigate('/writeTIL', { state: { groupName, groupId } })}>
              <Icon name='circle-plus' size='medium' />
              TIL 작성하기
            </Button>
          </StyledButtonWrapper>
        </StyledTILList>
      )}
    </>
  );
}

export default TILList;
