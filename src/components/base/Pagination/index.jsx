import { Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState } from 'react';

const Pagination = ({ defaultPage, limit, total, onChange }) => {
  const [page, setPage] = useState(defaultPage);
  const totalPage = Math.ceil(total / limit);

  const handleChangePage = (newPage) => {
    onChange(newPage);
    setPage(newPage);
  };

  return (
    <StyledPagination>
      <button onClick={() => handleChangePage(0)}>
        <Icon name='angles-left' />
      </button>
      <button onClick={() => page !== 0 && handleChangePage(page - 1)}>
        <Icon name='angle-left' />
      </button>
      {Array.from(new Array(totalPage), (_, i) => i)
        .filter((i) => i >= Math.floor(page / 10) * 10 && i < (Math.floor(page / 10) + 1) * 10)
        .map((i) => (
          <button key={i} style={{ color: page === i ? COLOR.DARK : undefined }} onClick={() => handleChangePage(i)}>
            {i + 1}
          </button>
        ))}
      <button onClick={() => page + 1 !== totalPage && handleChangePage(page + 1)}>
        <Icon name='angle-right' />
      </button>
      <button onClick={() => handleChangePage(totalPage - 1)}>
        <Icon name='angles-right' />
      </button>
    </StyledPagination>
  );
};

export default Pagination;

const StyledPagination = styled.div`
  padding: 3rem;
  text-align: center;

  & > button {
    font-weight: bold;
    color: ${COLOR.GRAY_30};
  }
`;
