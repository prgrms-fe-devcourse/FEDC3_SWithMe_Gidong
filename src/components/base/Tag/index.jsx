import { DefaultWrapper } from './styles';
import TagList from './TagList';

function Tag({ tagList, fontsize, ...props }) {
  return (
    <DefaultWrapper style={{ ...props.style }} {...props}>
      <TagList fontsize={fontsize} tagList={tagList} />
    </DefaultWrapper>
  );
}

export default Tag;
