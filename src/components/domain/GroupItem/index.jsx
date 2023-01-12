import { Header, Text } from '@/components';
import styled from '@emotion/styled';

function GroupItem({ group }) {
  return (
    <StyledGroupItem>
      <Header strong level={3}>
        {group.name}
      </Header>
      <Text>{group.description}</Text>
    </StyledGroupItem>
  );
}

export default GroupItem;

const StyledGroupItem = styled.li`
  padding: 1rem;
  font-size: 2rem;
`;
