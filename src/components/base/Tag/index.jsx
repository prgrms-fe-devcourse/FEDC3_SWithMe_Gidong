import PropTypes from 'prop-types';
import { DefaultWrapper } from './styles';
import TagList from './TagList';

function Tag({ tagList, fontsize, ...props }) {
  return (
    <DefaultWrapper style={{ ...props.style }} {...props}>
      <TagList fontsize={fontsize} tagList={tagList} />
    </DefaultWrapper>
  );
}

Tag.propTypes = {
  tagList: PropTypes.array,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default Tag;
