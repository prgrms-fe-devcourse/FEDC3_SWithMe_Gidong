import styled from '@emotion/styled';
import { COLOR } from '../../../styles/colors';

const SearchFilterButton = () => {
  return <StyledSearchFilterButton>전체</StyledSearchFilterButton>;
};

export default SearchFilterButton;

const StyledSearchFilterButton = styled.button`
  position: relative;
  display: inline-block;
  width: 7.7rem;
  height: 5.5rem;
  padding: 0;
  font-size: 1.8rem;
  border-style: solid;
  border-width: 0 0.05rem 0 0;
  border-color: ${COLOR.HEADER_SEARCHBAR_FILTER_BG};
`;
