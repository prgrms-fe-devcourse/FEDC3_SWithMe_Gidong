import { Button, Text, Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import PropTypes from 'prop-types';
import { StyledTagItem } from './styles';

function TagItem({ tag, onDeleteTagButtonClick, fontsize }) {
  return (
    <StyledTagItem>
      <Text size={fontsize ? fontsize : 'xSmall'} weight={300} color={COLOR.WHITE}>
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

TagItem.propTypes = {
  tag: PropTypes.string,
  onDeleteTagButtonClick: PropTypes.func,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default TagItem;
