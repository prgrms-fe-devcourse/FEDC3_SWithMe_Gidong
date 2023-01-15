import { imgTIL } from '@/assets/images';
import { Button, Empty, Icon, Spinner } from '@/components/base';
import TILItem from '@/components/domain/TILItem';
import { useTILContext } from '@/context/TILProvider';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TILList({ groupId, groupName }) {
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

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
