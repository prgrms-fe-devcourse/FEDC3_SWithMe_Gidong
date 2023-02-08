import { Button, Header, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

function SearchResultGroup(props) {
  const { group, index } = props;
  const navigate = useNavigate();

  const onClickJoinGroup = (group) => {
    navigate('/joinGroup', { state: { group } });
  };

  return (
    <StyledResultGroupCard>
      <StyledGroupUserAmount style={{ color: COLOR.GROUP_SEARCH_RESULT_COLOR[index] }}>
        <Icon name='user' size={2} />
        <Text size={1.6}>
          {group.description.member.length + 1}/{group.description.headCount}
        </Text>
      </StyledGroupUserAmount>
      <Header level='2' size='2.2rem'>
        {group.name}
      </Header>
      <StyledResultGroupTags>
        {group.description.tagList?.map((tag, index) => (
          <div key={index} style={{ textAlign: 'center', width: '100%', height: '2rem' }}>
            <Text size={1.8}>#{tag}</Text>
          </div>
        ))}
      </StyledResultGroupTags>
      <Button onClick={() => onClickJoinGroup(group)} style={{ backgroundColor: COLOR.WHITE }}>
        <Text size={1.5} underline color={COLOR.DARK}>
          그룹 가입하기
        </Text>
      </Button>
    </StyledResultGroupCard>
  );
}

export default SearchResultGroup;

const StyledResultGroupCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 22rem;
  height: 30rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${COLOR.WHITE};

  h2 {
    width: 18rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledGroupUserAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

const StyledResultGroupTags = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 1rem;

  width: 100%;
  height: 17.6rem;
  padding: 1.6rem 0;
  border-radius: 2.4rem;
  background-color: ${COLOR.GRAY_10};
  color: ${COLOR.GRAY4};
`;
