import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';
import { icSearchSubmit } from '@/assets/icons';
import { Divider, Input, Button } from '@/components/base';

const HeaderSearchBar = () => {
  return (
    <StyledHeaderSearchBar>
      <StyledSearchFilterButton>전체</StyledSearchFilterButton>
      <Divider position='absolute' type={'vertical'} size={0} height={5.5} color={COLOR.HEADER_DIVIDELINE} />
      <Input
        type='text'
        placeholder='스터디 그룹 검색'
        wrapperProps={{ style: { width: 'calc(100% - 15rem)', margin: '1.9rem 0 1.9rem 1.7rem' } }}
        style={{ fontSize: '1.8rem', height: '1.75rem', padding: '0', border: '0' }}
      />
      <Button
        bgcolor={COLOR.HEADER_SEARCHBAR_SUBMIT_BG}
        style={{ width: '4rem', height: '4rem', padding: '0', margin: '0.8rem 3.1rem 0.7rem 0', borderRadius: '2rem' }}>
        <SearchSubmitIcon src={icSearchSubmit} />
      </Button>
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

const SearchSubmitIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 1rem;
`;

const StyledSearchFilterButton = styled.button`
  position: relative;
  display: inline-block;
  width: 7.7rem;
  height: 5.5rem;
  padding: 0;
  font-size: 1.8rem;
`;
