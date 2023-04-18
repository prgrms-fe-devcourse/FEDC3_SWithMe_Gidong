import { Button, Heading, Icon, Text } from '@/components/base';

import { useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';
import * as S from './styles';

function SearchResultGroup({ group, index }) {
  const navigate = useNavigate();

  const onClickJoinGroup = (group) => {
    navigate('/joinGroup', { state: { group } });
  };

  return (
    <S.GroupCard>
      <S.GroupUserCount style={{ color: COLOR.GROUP_SEARCH_RESULT_COLOR[index] }}>
        <Icon name='user' size='medium' />
        <Text size='medium'>
          {group.description.member.length + 1}/{group.description.headCount}
        </Text>
      </S.GroupUserCount>
      <Heading level={6}>{group.name}</Heading>
      <S.GroupTags>
        {group.description.tagList?.map((tag) => (
          <div key={tag} style={{ textAlign: 'center', width: '100%', height: '2rem' }}>
            <Text size='large'>#{tag}</Text>
          </div>
        ))}
      </S.GroupTags>
      <Button version='transparent' fontSize='small' underline onClick={() => onClickJoinGroup(group)}>
        그룹 가입하기
      </Button>
    </S.GroupCard>
  );
}

export default SearchResultGroup;
