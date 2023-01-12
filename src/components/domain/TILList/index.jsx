import styled from '@emotion/styled';
import { useTILContext } from '@/context/TILProvider';
import { useState, useCallback, useEffect } from 'react';

function TILList({ groupId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { tils, onShowTILByGroup } = useTILContext();
  console.log('tils', tils);

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
    <StyledTILList>
      {tils.map((til) => {
        return <li key={til.id}>{til.title.title}</li>;
      })}
    </StyledTILList>
  );
}

export default TILList;

const StyledTILList = styled.div`
  display: block;
  height: 10rem;
  margin: 1rem;
`;
