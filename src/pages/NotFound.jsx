import { Image, Text, Button } from '@/components/base';

import { imgSearch } from '@/assets/images';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageWrapper>
      <StyledNotFound>
        <Image src={imgSearch} />
        <Text size={'large'}>해당 페이지를 찾을 수 없어요</Text>
        <Text size={'small'}>(404: NOT FOUND)</Text>
        <Button onClick={() => navigate('/')} size='medium' shape='round'>
          메인으로 돌아가기
        </Button>
      </StyledNotFound>
    </StyledPageWrapper>
  );
}

export default NotFound;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledNotFound = styled.div`
  display: grid;
  width: 40rem;
  justify-content: center;
  text-align: center;

  & > button {
    margin: 1.6rem 2.4rem;
  }

  & > img {
    width: 40rem;

    @media (max-width: 623.98px) {
      width: 30rem;
    }
  }
`;
