import PropTypes from 'prop-types';
import * as S from './styles';
import TagList from './TagList';

function Tag({ tagList, fontsize, ...props }) {
  return (
    <S.DefaultWrapper style={{ ...props.style }} {...props}>
      <TagList fontsize={fontsize} tagList={tagList} />
    </S.DefaultWrapper>
  );
}

Tag.propTypes = {
  tagList: PropTypes.array,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default Tag;
