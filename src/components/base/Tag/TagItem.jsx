import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledTagItem } from './styles';

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
