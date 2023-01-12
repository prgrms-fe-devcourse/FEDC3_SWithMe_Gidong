import styled from '@emotion/styled';
import { useTILContext } from '@/context/TILProvider';
import { useState, useCallback, useEffect } from 'react';
import TILItem from '@/components/domain/TILItem';
import { Spinner } from '@/components/base';
import { COLOR } from '@/styles/color';

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
        <StyledTILList>
          {tils?.map((til) => (
            <TILItem key={til.title} til={til} />
          ))}
        </StyledTILList>
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
