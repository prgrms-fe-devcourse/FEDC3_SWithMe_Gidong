import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';

const StyledPagination = styled.div`
  padding-top: 3rem;
  text-align: center;

  & > button {
    font-weight: bold;
    color: ${COLOR.GRAY_30};
  }
`;

export { StyledPagination };
