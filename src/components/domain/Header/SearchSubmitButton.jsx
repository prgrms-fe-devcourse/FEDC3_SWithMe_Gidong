import styled from '@emotion/styled';
import searchSubmit from '@/assets/icons/searchSubmit.svg';
import { COLOR } from '../../../styles/colors';

const SearchSubmitButton = () => {
  return (
    <StyledSearchSubmitButton>
      <SearchSubmitIcon src={searchSubmit} />
    </StyledSearchSubmitButton>
  );
};

export default SearchSubmitButton;

const StyledSearchSubmitButton = styled.button`
  width: 4rem;
  height: 4rem;
  background-color: ${COLOR.HEADER_SEARCHBAR_SUBMIT_BG};
  padding: 0;
  margin: 0.8rem 3.1rem 0.7rem 0;
  border-radius: 2rem;
`;

const SearchSubmitIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;
