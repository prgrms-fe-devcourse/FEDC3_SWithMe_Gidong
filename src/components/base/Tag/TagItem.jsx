import { Button, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import PropTypes from 'prop-types';
import { StyledTagItem } from './styles';

function TagItem({ tag, onDeleteTagButtonClick, fontsize }) {
  return (
    <StyledTagItem>
      <Text size={fontsize ? fontsize : 'xSmall'} weight={300} color={COLOR.WHITE}>
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

TagItem.propTypes = {
  tag: PropTypes.string,
  onDeleteTagButtonClick: PropTypes.func,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default TagItem;
