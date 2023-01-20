import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { COLOR } from '@/styles/color';
import { css } from '@emotion/react';
import { Logo, SearchBar, UserNav } from '@/components/domain/TemplateHeader';

function Template({ children }) {
  const headerRef = useRef(null);
  const location = useLocation();
  const [isFontWhite, setIsFontWhite] = useState(false);
  const [isColorHeaderPage, setIsColorHeaderPage] = useState(false);
  const pathnameList = ['/', '/joinGroup', '/myPage'];

  useEffect(() => {
    if (pathnameList.includes(location.pathname)) {
      setIsColorHeaderPage(true);
      setIsFontWhite(true);
      return;
    }
    setIsColorHeaderPage(false);
    setIsFontWhite(false);
  }, [location.pathname]);

  useEffect(() => {
    const changeHeaderBackground = () => {
      if (window.scrollY) {
        headerRef.current.style.backgroundColor = 'white';
        headerRef.current.style.boxShadow = '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)';
        isColorHeaderPage && setIsFontWhite(false);
      } else {
        headerRef.current.style.backgroundColor = 'transparent';
        headerRef.current.style.boxShadow = 'none';
        isColorHeaderPage && setIsFontWhite(true);
      }
    };
    window.addEventListener('scroll', changeHeaderBackground);
    return () => {
      window.removeEventListener('scroll', changeHeaderBackground);
    };
  }, [isFontWhite]);

  return (
    <StyledTemplate>
      <StyledHeaderContainer ref={headerRef} isFontWhite={isFontWhite}>
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

  ${({ isFontWhite }) =>
    isFontWhite &&
    css`
      & h1,
      & button {
        color: ${COLOR.WHITE};
      }
    `};
`;