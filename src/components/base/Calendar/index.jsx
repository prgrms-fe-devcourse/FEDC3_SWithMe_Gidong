import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { ko } from 'date-fns/esm/locale';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker_custom.css';

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

export default Calendar;

const StyledDatePicker = styled(DatePicker)`
  width: 10rem;
  padding-left: 1rem;
  color: ${COLOR.DARK};
  cursor: pointer;
`;
