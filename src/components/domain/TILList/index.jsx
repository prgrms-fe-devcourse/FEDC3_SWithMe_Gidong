import styled from '@emotion/styled';
import { useTILContext } from '@/context/TILProvider';
import { useState, useCallback, useEffect } from 'react';
import TILItem from '@/components/domain/TILItem';
import { Spinner, Text } from '@/components/base';
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
        <StyledSpinnerWrapper>
          <Spinner size={40} color={COLOR.TAG_COLOR[1]} />
        </StyledSpinnerWrapper>
      ) : (
        <>
          {tils?.length ? (
            <StyledTILList>
              {tils?.map((til) => (
                <TILItem key={til.title} til={til} />
              ))}
            </StyledTILList>
          ) : (
            <StyledTILEmpty>
              <img src={imgTIL} alt='TIL을 작성해보세요.' />
              <Text strong paragraph size={2} lineHeight={2}>
                그룹에 TIL이 없습니다.
              </Text>
              <Text paragraph size={2}>
                TIL을 작성해보세요!
              </Text>
            </StyledTILEmpty>
          )}
        </>
      )}
    </>
  );
}

export default TILList;

const StyledSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3rem;
`;

const StyledTILList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  gap: 3rem 0;
  padding: 1rem;

  justify-items: center;
  align-items: center;
`;

const StyledTILEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0;
  color: ${COLOR.DARK};

  & > img {
    width: 30rem;
  }
`;
