import styled from '@emotion/styled';

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0;
  color: ${({ theme }) => theme.colors.black_800};
`;
