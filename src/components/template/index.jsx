import { Logo, SearchBar, UserNav } from '@/components/domain/TemplateHeader';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './styles';

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
    <S.Template>
      <S.HeaderContainer ref={headerRef} isFontWhite={isFontWhite} isScrolled={isScrolled}>
        <Logo />
        <SearchBar />
        <UserNav />
      </S.HeaderContainer>
      {children}
    </S.Template>
  );
}

export default Template;
