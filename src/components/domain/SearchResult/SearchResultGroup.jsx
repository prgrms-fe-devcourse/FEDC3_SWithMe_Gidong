import { Button, Header, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function SearchResultGroup(props) {
  const { group, index, onClick } = props;

  return (
    <StyledResultGruopCard>
      <StyledGroupUserAmount style={{ color: COLOR.GROUP_SEARCH_RESULT_COLOR[index] }}>
        <Icon name='user' size={2} />
        <Text size={1.6}>
          {group.description.member.length}/{group.description.headCount}
        </Text>
      </StyledGroupUserAmount>
      <Header size='2.4rem'>{group.name}</Header>
      <StyledResultGroupTags>
        {group.description.tagList?.map((tag, index) => (
          <div key={index} style={{ textAlign: 'center', width: '100%', height: '2rem' }}>
            <Text size={1.8}>#{tag}</Text>
          </div>
        ))}
      </StyledResultGroupTags>
      <Button onClick={onClick} style={{ backgroundColor: COLOR.WHITE }}>
        <Text size={1.5} underline>
          자세히 보기
        </Text>
      </Button>
    </StyledResultGruopCard>
  );
}

export default SearchResultGroup;

const StyledResultGruopCard = styled.div`
  display: grid;
  overflow: hidden;
  width: 21.4rem;
  height: 32rem;
  padding: 2rem 1.5rem;
  border-radius: 2.4rem;
  background-color: ${COLOR.WHITE};

  & > h1 {
    text-align: center;
  }
`;

const StyledGroupUserAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledResultGroupTags = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 1.6rem 0;
  gap: 1rem;
  width: 100%;
  height: 17.6rem;
  border-radius: 2.4rem;
  background-color: ${COLOR.GRAY};
  color: ${COLOR.GRAY4};
`;
