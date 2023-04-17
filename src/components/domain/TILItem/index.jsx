import { Text } from '@/components/base';

import { cleanText } from '@/utils/cleanText';

import { Link } from 'react-router-dom';

import theme from '@/styles/theme';
import { StyledDate, StyledPlusButton, StyledTag, StyledTagList, StyledTILContent, StyledTILItem } from './styles';

function TILItem({ til }) {
  const {
    title: { title, body, tagList },
    createdAt,
  } = til;

  return (
    <StyledTILItem>
      <StyledDate>
        <Text paragraph size='small' weight={300} color={theme.colors.black_800}>
          {createdAt.slice(0, 10)}
        </Text>
      </StyledDate>
      <StyledTILContent>
        <Text paragraph size='xxLarge' weight={600}>
          {title}
        </Text>
        <Text paragraph size='large' weight={300} color={theme.colors.black_800}>
          {cleanText(body)}
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
