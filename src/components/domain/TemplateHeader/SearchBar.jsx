import { Button, Icon } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '@/context/ToastProvider';

const FILLTER_OPTIONS = ['전체', '그룹명', '태그'];
const SEARCH_VALUE_LENGTH_MIN = 2;
const SEARCH_ERROR = {
  INPUT_VALUE_LENGTH_MIN: '두 글자 이상 입력해주세요.',
};

const SearchBar = () => {
  const { addToast } = useToastContext();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [filterValue, setFilterValue] = useState('전체');
  const [searchValue, setSearchValue] = useState('');

  const handleDropdown = (e) => {
    setDropdown(!dropdown);

    if (dropdown) setFilterValue(e.target.innerText);
  };

  const onKeyDownEsc = (e) => {
    if (e.key === 'Escape') {
      setDropdown(false);
    }
  };

  const onBlurDropDown = () => {
    setDropdown(false);
  };

  const handleGroupSearch = async () => {
    if (searchValue.length < SEARCH_VALUE_LENGTH_MIN) {
      addToast(SEARCH_ERROR.INPUT_VALUE_LENGTH_MIN);
      return;
    }

    navigate('/searchResult', { state: { filterValue, searchValue } });
    setSearchValue('');
  };

  const onClickEnter = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleGroupSearch();
    }
  };

  return (
    <StyledHeaderSearchBar>
      <StyledDropdownTrigger onClick={handleDropdown} onKeyDown={onKeyDownEsc} onBlur={onBlurDropDown}>
        {filterValue}
      </StyledDropdownTrigger>
      {dropdown && (
        <StyledDropdownUl>
          {FILLTER_OPTIONS.map((option, index) => (
            <li key={index}>
              <button value={option} onMouseDown={handleDropdown} style={{ color: COLOR.DARK }}>
                {option}
              </button>
            </li>
          ))}
        </StyledDropdownUl>
      )}
      <StyledSearchInput
        type={'text'}
        placeholder={'스터디 그룹 검색'}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onClickEnter(e)}
      />
      <Button
        bgcolor={COLOR.HEADER_SEARCHBAR_SUBMIT_BG}
        style={{ width: '3rem', height: '3rem', padding: '0', marginRight: '2rem', borderRadius: '50%' }}
        onClick={handleGroupSearch}>
        <Icon name='magnifying-glass' style={{ color: 'white' }} />
      </Button>
    </StyledHeaderSearchBar>
  );
};

export default SearchBar;

const StyledHeaderSearchBar = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  max-width: 52.9rem;
  height: 5rem;
  border-radius: 2.5rem;
  background: ${COLOR.HEADER_SEARCHBAR_BG};
  filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.1));

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledDropdownTrigger = styled.button`
  position: relative;
  display: inline-block;
  width: 7.7rem;
  padding: 0;
  font-size: 1.8rem;
  border-right: 1px solid ${COLOR.HEADER_DIVIDELINE};
  color: ${COLOR.DARK} !important;
`;

const StyledDropdownUl = styled.ul`
  display: grid;
  position: absolute;
  margin-top: 16rem;
  overflow: hidden;
  width: 8rem;
  height: 11rem;
  border-radius: 2rem;
  background-color: white;

  & > li > button {
    width: 8rem;
    height: 3.7rem;
    padding: 0;
    border-bottom: 0.05rem solid ${COLOR.LIGHTGRAY2};
    font-size: 1.8rem;
    color: ${COLOR.DARK};
  }

  & > li > button:hover {
    background-color: ${COLOR.LIGHTGRAY};
  }
`;

const StyledSearchInput = styled.input`
  position: relative;
  display: inline-block;
  width: calc(100% - 15rem);
  height: 1.75rem;
  padding: 0;
  border: 0;
  font-size: 1.8rem;
  margin: 1.9rem 0 1.9rem 1.7rem;
  background: ${COLOR.HEADER_SEARCHBAR_BG};
`;
