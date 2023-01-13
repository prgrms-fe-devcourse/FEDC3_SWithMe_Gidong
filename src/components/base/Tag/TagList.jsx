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

export default TagList;
