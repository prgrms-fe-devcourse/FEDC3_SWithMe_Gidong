import { Logo, SearchBar, UserNav } from '@/components/domain/TemplateHeader';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Template({ children }) {
  const headerRef = useRef(null);
  const location = useLocation();
  const [isFontWhite, setIsFontWhite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathnameList = ['/', '/joinGroup', '/myPage'];

  useEffect(() => {
    if (pathnameList.includes(location.pathname)) return setIsFontWhite(true);
    setIsFontWhite(false);
  }, [location]);

  useEffect(() => {
    const changeHeaderBackground = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', changeHeaderBackground);
    return () => {
      window.removeEventListener('scroll', changeHeaderBackground);
    };
  }, []);

  return (
    <StyledTemplate>
      <StyledHeaderContainer ref={headerRef} isFontWhite={isFontWhite} isScrolled={isScrolled}>
        <Logo />
        <SearchBar />
        <UserNav />
      </StyledHeaderContainer>
      {children}
    </StyledTemplate>
  );
}

export default Template;

const StyledTemplate = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  top: 0;

  z-index: 1;
  position: fixed;

  width: 100%;
  height: 7rem;
  background-color: transparent;
  box-shadow: none;

  ${({ isFontWhite }) =>
    isFontWhite &&
    css`
      & button,
      & i {
        color: ${COLOR.WHITE};
      }
    `};

  ${({ isScrolled }) =>
    isScrolled &&
    css`
      background-color: ${COLOR.WHITE};
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);

      & button,
      & div > i {
        color: black;
      }
    `};
`;
