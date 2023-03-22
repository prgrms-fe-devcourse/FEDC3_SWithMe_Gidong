import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker_custom.css';

const StyledDatePicker = styled(DatePicker)`
  width: 10rem;
  padding-left: 2rem;
  color: ${COLOR.DARK};
  cursor: pointer;
`;

export { StyledDatePicker };
