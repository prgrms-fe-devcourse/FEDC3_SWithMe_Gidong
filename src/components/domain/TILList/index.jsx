import { imgTIL } from '@/assets/images';
import { Empty, Pagination, Spinner, Text, Divider } from '@/components/base';
import TILItem from '@/components/domain/TILItem';
import { useTILContext } from '@/context/TILProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

function TILList({ groupId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tils, onShowTILByGroup } = useTILContext();
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

  return (
    <>
      {isLoading ? (
        <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
      ) : (
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
                  <div>
                    <button>전체 보기</button>
                    <Divider type='vertical' color={COLOR.GRAY_30} />
                    <button>날짜 보기</button>
                  </div>
                  <div>
                    <button>최신순</button>
                    <Divider type='vertical' color={COLOR.GRAY_30} />
                    <button>좋아요순</button>
                  </div>
                </StyledFilter>
              </StyledFilterWrapper>
              <StyledTILWrapper>
                {tils.slice(offset, offset + LIMIT).map((til) => (
                  <TILItem key={til._id} til={til} />
                ))}
              </StyledTILWrapper>
              <Pagination defaultPage={0} limit={LIMIT} total={tils.length} onChange={setCurrentPage} />
            </>
          ) : (
            <Empty src={imgTIL} width={30} mainText='그룹에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
          )}
        </StyledTILList>
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
    padding: 0;
  }
`;
