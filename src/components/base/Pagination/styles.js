import styled from '@emotion/styled';

export const Pagination = styled.div`
  padding-top: 3rem;
  text-align: center;

  & > button {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black_200};
  }
`;
