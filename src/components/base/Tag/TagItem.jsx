import { Button, Text, Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import { StyledTagItem } from './styles';

function TagItem({ tag, onDeleteTagButtonClick, fontsize }) {
  return (
    <StyledTagItem>
      <Text size={fontsize ? fontsize : 1} weight={300} color={COLOR.WHITE}>
        {tag}
        {onDeleteTagButtonClick && (
          <Button fontSize='xSmall' version='transparent' onClick={onDeleteTagButtonClick}>
            <Icon name='trash-can' />
          </Button>
        )}
      </Text>
    </StyledTagItem>
  );
}

export default TagItem;
