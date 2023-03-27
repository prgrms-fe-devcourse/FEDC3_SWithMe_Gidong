import { ko } from 'date-fns/esm/locale';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { StyledDatePicker } from './styles';

function Calendar({ onChange }) {
  const [startDate, setStartDate] = useState(new Date());

  const dateToString = (date) =>
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0');

  useEffect(() => {
    onChange(dateToString(startDate));
  }, [startDate]);

  return (
    <StyledDatePicker
      selected={startDate}
      locale={ko}
      disabledKeyboardNavigation
      dateFormat='yyyy/MM/dd'
      onChange={(date) => setStartDate(date)}
    />
  );
}

Calendar.propTypes = {
  onChange: PropTypes.func,
};

export default Calendar;
