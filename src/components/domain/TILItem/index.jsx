import { Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { Link } from 'react-router-dom';
import { StyledDate, StyledPlusButton, StyledTag, StyledTagList, StyledTILContent, StyledTILItem } from './styles';

function TILItem({ til }) {
  const {
    title: { title, body, tagList },
    createdAt,
  } = til;

  return (
    <StyledTILItem>
      <StyledDate>
        <Text paragraph size={1.2} weight={300} color={COLOR.DARK}>
          {createdAt.slice(0, 10)}
        </Text>
      </StyledDate>
      <StyledTILContent>
        <Text strong paragraph size={2.4} lineHeight={1.2}>
          {title}
        </Text>
        <Text paragraph size={1.8} weight={300} color={COLOR.DARK}>
          {body}
        </Text>
        <StyledTagList>
          {tagList?.map((tag) => (
            <StyledTag key={tag}>{tag}</StyledTag>
          ))}
        </StyledTagList>
      </StyledTILContent>
      <Link to={`/TIL/${til._id}`}>
        <StyledPlusButton>
          <i className='fa-solid fa-plus'></i>
        </StyledPlusButton>
      </Link>
    </StyledTILItem>
  );
}

export default TILItem;
