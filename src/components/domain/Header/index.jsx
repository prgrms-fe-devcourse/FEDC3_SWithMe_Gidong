import styled from '@emotion/styled';
import HeaderLogo from './HeaderLogo';
import HeaderSearchBar from './HeaderSearchBar';
import HeaderUserNav from './HeaderUserNav';
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

const Header = () => {
  const headerRef = useRef(null);
  const location = useLocation();
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    if (location.pathname === '/joinGroup') {
      setIsWhite(true);
    } else {
      setIsWhite(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const changeHeaderBackground = () => {
      if (window.scrollY) {
        headerRef.current.style.backgroundColor = 'white';
        headerRef.current.style.boxShadow = '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)';
      } else {
        headerRef.current.style.backgroundColor = 'transparent';
        headerRef.current.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', changeHeaderBackground);
    return () => {
      window.removeEventListener('scroll', changeHeaderBackground);
    };
  }, []);

  return (
    <StyledHeaderContainer ref={headerRef} isWhite={isWhite}>
      <HeaderLogo />
      <HeaderSearchBar />
      <HeaderUserNav />
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;

  z-index: 1;
  position: fixed;

  width: 100%;
  height: 7rem;
  background-color: transparent;

  ${({ isWhite }) =>
    isWhite &&
    css`
      & h1,
      & button {
        color: white;
      }
    `};
`;
