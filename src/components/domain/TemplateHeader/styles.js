import styled from '@emotion/styled';
import { COLOR } from '@/styles/color';

const StyledHeaderLogo = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: fit-content;
  height: 6.4rem;
  margin-left: 2rem;
  padding: 0;

  & > h5 {
    white-space: nowrap;
  }
`;

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

    &:last-of-type {
      width: 3rem;
      height: 3rem;
      margin-right: 2rem;
    }
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

const StyledUserNav = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;

  position: relative;

  & button {
    white-space: nowrap;
  }

  & button:hover {
    color: ${COLOR.GRAY3};
  }
`;

const StyledAuthorized = styled.div`
  display: flex;
  gap: 2rem;

  & > i:first-of-type {
    display: none;

    @media (max-width: 623.98px) {
      display: block;
    }
  }

  & > i:nth-of-type(n + 2):nth-of-type(-n + 3),
  button {
    display: block;

    @media (max-width: 991.98px) {
      display: none;
    }
  }

  & > i:last-of-type {
    display: none;

    @media (max-width: 991.98px) {
      display: block;
    }
  }
`;

export {
  StyledHeaderLogo,
  StyledHeaderSearchBar,
  StyledDropdownTrigger,
  StyledDropdownUl,
  StyledSearchInput,
  StyledUserNav,
  StyledAuthorized,
};
