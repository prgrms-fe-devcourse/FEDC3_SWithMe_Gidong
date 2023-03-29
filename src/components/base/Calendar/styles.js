import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker_custom.css';

const StyledDatePicker = styled(DatePicker)`
  width: 10rem;
  padding-left: 2rem;
  color: ${({ theme }) => theme.colors.black_800};
  cursor: pointer;
`;

export { StyledDatePicker as DatePicker };
