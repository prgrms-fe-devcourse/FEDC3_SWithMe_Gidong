import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function TagItem({ tag, onDeleteTagButtonClick, fontsize }) {
  return (
    <StyledTagItem>
      <Text size={fontsize ? fontsize : 1} weight={300} color={COLOR.WHITE}>
        {tag}
        {onDeleteTagButtonClick && (
          <Button
            bgcolor='transparent'
            onClick={onDeleteTagButtonClick}
            style={{ fontSize: '1rem', fontWeight: '700', padding: '0 0 0 1rem' }}>
            X
          </Button>
        )}
      </Text>
    </StyledTagItem>
  );
}

export default TagItem;

const StyledTagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.3rem;
  padding: 0.5rem;
  background-color: ${COLOR.PRIMARY_BTN};
  border-radius: 0.4rem;

  &:nth-of-type(1) {
    margin: 0 0.3rem 0 0;
  }
`;
