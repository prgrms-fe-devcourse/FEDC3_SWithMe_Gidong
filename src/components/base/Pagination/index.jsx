import { Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyledPagination } from './styles';

const Pagination = ({ defaultPage = 0, limit, total, onChange }) => {
  const [page, setPage] = useState(defaultPage);
  const totalPage = Math.ceil(total / limit);

  const handleChangePage = (newPage) => {
    onChange(newPage);
    setPage(newPage);
  };

  if (!totalPage) return null;

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

Pagination.propTypes = {
  onChange: PropTypes.func,
};

export default Pagination;
