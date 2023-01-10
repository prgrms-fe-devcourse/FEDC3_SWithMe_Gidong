import styled from '@emotion/styled';
import { COLOR } from '../../../styles/colors';
import SearchFilterButton from './SearchFilterButton';
import SearchInput from './SearchInput';
import SearchSubmitButton from './SearchSubmitButton';

const HeaderSearchBar = () => {
  return (
    <StyledHeaderSearchBar>
      <SearchFilterButton />
      <SearchInput />
      <SearchSubmitButton />
    </StyledHeaderSearchBar>
  );
};

export default HeaderSearchBar;

const StyledHeaderSearchBar = styled.div`
  display: flex;
  width: 52.9rem;
  height: 5.5rem;
  margin: 1.3rem 0 1.2rem 0;
  border-radius: 2rem;
  background: ${COLOR.HEADER_SEARCHBAR_BG};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
