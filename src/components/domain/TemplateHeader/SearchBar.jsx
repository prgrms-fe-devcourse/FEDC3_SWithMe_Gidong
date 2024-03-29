import { Button, Icon } from '@/components/base';

import useToasts from '@/hooks/useToasts';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { COLOR } from '@/styles/color';
import { StyledDropdownTrigger, StyledDropdownUl, StyledHeaderSearchBar, StyledSearchInput } from './styles';

const FILTER_OPTIONS = ['전체', '그룹명', '태그'];
const SEARCH_VALUE_LENGTH_MIN = 2;
const SEARCH_ERROR = {
  INPUT_VALUE_LENGTH_MIN: '두 글자 이상 입력해주세요.',
};

const SearchBar = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
  };

  const onClickEnter = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleGroupSearch();
    }
  };

  useEffect(() => {
    if (pathname !== '/searchResult') setSearchValue('');
  }, [pathname]);

  return (
    <StyledHeaderSearchBar>
      <StyledDropdownTrigger onClick={handleDropdown} onKeyDown={onKeyDownEsc} onBlur={onBlurDropDown}>
        {filterValue}
      </StyledDropdownTrigger>
      {dropdown && (
        <StyledDropdownUl>
          {FILTER_OPTIONS.map((option, index) => (
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
      <Button shape='circle' version='main' onClick={handleGroupSearch}>
        <Icon name='magnifying-glass' color={COLOR.WHITE} />
      </Button>
    </StyledHeaderSearchBar>
  );
};

export default SearchBar;
