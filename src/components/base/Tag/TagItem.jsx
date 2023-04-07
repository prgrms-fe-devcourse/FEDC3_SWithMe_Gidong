import { Button, Icon, Text } from '@/components/base';
import theme from '@/styles/theme';
import PropTypes from 'prop-types';
import * as S from './styles';

function TagItem({ tag, onDeleteTagButtonClick, fontsize }) {
  return (
    <S.TagItem>
      <Text size={fontsize ? fontsize : 'xSmall'} weight={300} color={theme.colors.white_900}>
        {tag}
        {onDeleteTagButtonClick && (
          <Button fontSize='xSmall' version='transparent' onClick={onDeleteTagButtonClick}>
            <Icon name='trash-can' color={theme.colors.black_900} />
          </Button>
        )}
      </Text>
    </S.TagItem>
  );
}

TagItem.propTypes = {
  tag: PropTypes.string,
  onDeleteTagButtonClick: PropTypes.func,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default TagItem;
