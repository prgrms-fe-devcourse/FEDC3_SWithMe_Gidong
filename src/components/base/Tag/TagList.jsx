import PropTypes from 'prop-types';
import TagItem from './TagItem';

function TagList({ tagList, onDeleteTagButtonClick, fontsize }) {
  return (
    <>
      {tagList.map((tag, index) => (
        <TagItem key={index} tag={tag} onDeleteTagButtonClick={onDeleteTagButtonClick} fontsize={fontsize} />
      ))}
    </>
  );
}

TagList.propTypes = {
  tag: PropTypes.string,
  onDeleteTagButtonClick: PropTypes.func,
  fontsize: PropTypes.oneOf(['default', 'xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'huge']),
};

export default TagList;
