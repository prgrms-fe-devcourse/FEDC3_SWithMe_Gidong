import styled from '@emotion/styled';
import { Button, Text } from '@/components/base';

function TagItem({ tag, onDeleteTagButtonClick }) {
  return (
    <StyledTagItem>
      <Text size={1} weight={300} color='#ffffff'>
        {tag}
        <Button bgcolor='transparent' onClick={onDeleteTagButtonClick} style={{ fontSize: '1rem', fontWeight: '700' }}>
          X
        </Button>
      </Text>
    </StyledTagItem>
  );
}

export default TagItem;

const StyledTagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.3rem;
  padding: 0.5rem;
  background-color: #617ceb;
  border-radius: 0.4rem;
`;
