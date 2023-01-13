import styled from '@emotion/styled';
import { useTILContext } from '@/context/TILProvider';
import { useState, useCallback, useEffect } from 'react';
import TILItem from '@/components/domain/TILItem';
import { Spinner, Empty } from '@/components/base';
import { COLOR } from '@/styles/color';
import { imgTIL } from '@/assets/images';

function TILList({ groupId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tils, onShowTILByGroup } = useTILContext();

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
        <>
          {tils.length ? (
            <StyledTILList>
              {tils.map((til) => (
                <TILItem key={til._id} til={til} />
              ))}
            </StyledTILList>
          ) : (
            <Empty src={imgTIL} width={30} mainText='그룹에 TIL이 없습니다.' subText='TIL을 작성해보세요!' />
          )}
        </>
      )}
    </>
  );
}

export default TILList;

const StyledTILList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 3rem 0;
  padding: 1rem;

  justify-items: center;
  align-items: center;

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
