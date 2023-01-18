import { icSearchSubmit } from '@/assets/icons';
import { Button, Input } from '@/components/base';
import { COLOR } from '@/styles/color';
import styled from '@emotion/styled';
import { useState } from 'react';
import HeaderDropdownItem from './HeaderDropdownItem';

const HeaderSearchBar = () => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <StyledHeaderSearchBar>
      <StyledDropdownTrigger onClick={handleDropdown}>전체</StyledDropdownTrigger>
      {dropdown ? (
        <StyledDropdownUl>
          <HeaderDropdownItem content={'전체'} onClick={handleDropdown} />
          <HeaderDropdownItem content={'그룹명'} onClick={handleDropdown} />
          <HeaderDropdownItem content={'태그'} onClick={handleDropdown} />
        </StyledDropdownUl>
      ) : null}
      <Input
        type='text'
        placeholder='스터디 그룹 검색'
        wrapperProps={{ style: { width: 'calc(100% - 15rem)', margin: '1.9rem 0 1.9rem 1.7rem' } }}
        style={{ fontSize: '1.8rem', height: '1.75rem', padding: '0', border: '0' }}
      />
      <Button
        bgcolor={COLOR.HEADER_SEARCHBAR_SUBMIT_BG}
        style={{ width: '3rem', height: '3rem', padding: '0', marginRight: '2rem', borderRadius: '50%' }}>
        <SearchSubmitIcon src={icSearchSubmit} />
      </Button>
    </StyledHeaderSearchBar>
  );
};

export default HeaderSearchBar;

const StyledHeaderSearchBar = styled.div`
  display: flex;
  align-items: center;

  width: 52.9rem;
  height: 5rem;
  margin: 0 2rem;
  border-radius: 2.5rem;
  background: ${COLOR.HEADER_SEARCHBAR_BG};
  filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.1));

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SearchSubmitIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
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

  &>li>button: hover {
    background-color: lightgray;
  }
`;
