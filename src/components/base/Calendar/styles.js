import styled from '@emotion/styled';
import { default as ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker_custom.css';

export const DatePicker = styled(ReactDatePicker)`
  width: 10rem;
  padding-left: 2rem;
  color: ${({ theme }) => theme.colors.black_800};
  cursor: pointer;
`;
