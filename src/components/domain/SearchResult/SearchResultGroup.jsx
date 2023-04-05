import { Button, Heading, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import { useNavigate } from 'react-router-dom';
import { StyledGroupUserAmount, StyledResultGroupCard, StyledResultGroupTags } from './styles';

function SearchResultGroup({ group, index }) {
  const navigate = useNavigate();

  const onClickJoinGroup = (group) => {
    navigate('/joinGroup', { state: { group } });
  };

  return (
    <StyledResultGroupCard>
      <StyledGroupUserAmount style={{ color: COLOR.GROUP_SEARCH_RESULT_COLOR[index] }}>
        <Icon name='user' size='medium' />
        <Text size='medium'>
          {group.description.member.length + 1}/{group.description.headCount}
        </Text>
      </StyledGroupUserAmount>
      <Heading level={6}>{group.name}</Heading>
      <StyledResultGroupTags>
        {group.description.tagList?.map((tag) => (
          <div key={tag} style={{ textAlign: 'center', width: '100%', height: '2rem' }}>
            <Text size='large'>#{tag}</Text>
          </div>
        ))}
      </StyledResultGroupTags>
      <Button version='transparent' fontSize='small' underline onClick={() => onClickJoinGroup(group)}>
        그룹 가입하기
      </Button>
    </StyledResultGroupCard>
  );
}

export default SearchResultGroup;
