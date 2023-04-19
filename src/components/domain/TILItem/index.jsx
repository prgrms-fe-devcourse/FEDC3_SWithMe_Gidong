import { Text } from '@/components/base';

import { cleanMarkdown } from '@/utils/cleanMarkdown';

import { Link } from 'react-router-dom';

import theme from '@/styles/theme';
import * as S from './styles';

function TILItem({ til }) {
  const {
    title: { title, body, tagList },
    createdAt,
  } = til;

  return (
    <S.TILItem>
      <S.Date>
        <Text paragraph size='small' weight={300} color={theme.colors.black_800}>
          {createdAt.slice(0, 10)}
        </Text>
      </S.Date>
      <S.TILContent>
        <Text paragraph size='xxLarge' weight={600}>
          {title}
        </Text>
        <Text paragraph size='large' weight={300} color={theme.colors.black_800}>
          {cleanMarkdown(body)}
        </Text>
        <S.TagList>
          {tagList?.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.TagList>
      </S.TILContent>
      <Link to={`/TIL/${til._id}`}>
        <S.PlusButton>
          <i className='fa-solid fa-plus'></i>
        </S.PlusButton>
      </Link>
    </S.TILItem>
  );
}

export default TILItem;
