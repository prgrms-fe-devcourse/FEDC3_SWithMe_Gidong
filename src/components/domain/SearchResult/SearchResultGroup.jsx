import { Button, Header, Icon, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function SearchResultGroup(props) {
  const { groupCurrent, groupMax, groupTitle, index } = props;

  return (
    <StyledResultGruopCard>
      <div style={{ color: COLOR.GROUP_SEARCH_RESULT_COLOR[index] }}>
        <Icon name='user' size={2} />
        <Text size={1.6}>
          {groupCurrent}/{groupMax}
        </Text>
      </div>
      <Header size='2.4rem'>{groupTitle}</Header>
      <StyledResultGroupTags>
        <Text size={1.6}>#개발</Text>
        <Text size={1.6}>#개발</Text>
        <Text size={1.6}>#개발</Text>
        <Text size={1.6}>#개발</Text>
        <Text size={1.6}>#개발</Text>
      </StyledResultGroupTags>
      <Button style={{ backgroundColor: COLOR.WHITE }}>
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

  & > div {
    text-align: right;
  }

  & > h1 {
    text-align: center;
  }
`;

const StyledResultGroupTags = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 17.6rem;
  border-radius: 2.4rem;
  background-color: ${COLOR.GRAY};
  color: ${COLOR.GRAY2};
`;
