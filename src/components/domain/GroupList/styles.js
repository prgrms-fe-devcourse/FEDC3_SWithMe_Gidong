import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledGroupList = styled.ul`
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${({ isEmpty }) => (isEmpty ? COLOR.GRAY_10 : COLOR.WHITE)};
`;

export { StyledGroupList };
