import TagItem from './TagItem';

function TagList({ tagList, onDeleteTagButtonClick }) {
  return (
    <>
      {tagList.map((tag, index) => (
        <TagItem key={index} tag={tag} onDeleteTagButtonClick={onDeleteTagButtonClick} />
      ))}
    </>
  );
}

export default TagList;
