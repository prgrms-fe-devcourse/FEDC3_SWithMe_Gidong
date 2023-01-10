import styled from '@emotion/styled';
import { COLOR } from '../../../styles/colors';

const SearchInput = () => {
  return <StyledSearchInput type='text' defaultValue='스터디 그룹 검색' />;
};

export default SearchInput;

const StyledSearchInput = styled.input`
  width: calc(100% - 15rem);
  height: 1.75rem;
  margin: 1.9rem 0 1.9rem 1.7rem;
  font-size: 1.8rem;
  color: ${COLOR.HEADER_SEARCHBAR_INPUT_FONT};
`;
