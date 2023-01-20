import { Header, Text } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

function SearchResultContainer({ title, groupTotal, children }) {
  return (
    <StyledGroupContainer>
      <StyledGroupListHeader>
        <Header size='4.8rem'>{title}</Header>
        <Text size={2}>
          전체 <Text style={{ color: COLOR.RED }}> {groupTotal} </Text> 결과
        </Text>
      </StyledGroupListHeader>
      <StyledGroupListContainer>{children}</StyledGroupListContainer>
    </StyledGroupContainer>
  );
}

export default SearchResultContainer;

const StyledGroupContainer = styled.div`
  display: block;
  margin: 6rem auto;
  max-width: 115.6rem;
  min-width: 62.5rem;
`;

const StyledGroupListHeader = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 2.4rem;
  margin-bottom: 3.2rem;
  height: 6rem;

  & > span {
    margin-left: 1.5rem;
  }
`;

const StyledGroupListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem 5.2rem;
  padding: 5.3rem 7.2rem;
  border-radius: 5rem;
  background-color: ${COLOR.GRAY};
`;
