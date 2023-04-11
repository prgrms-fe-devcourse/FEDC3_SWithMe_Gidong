import { Icon } from '@/components/base';
import { Logo, SearchBar, UserNav } from '@/components/domain/TemplateHeader';

import { isSearchBarVisibleState } from '@/stores/searchBar';
import { useRecoilState } from 'recoil';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as S from './styles';

const PATH_NAMES = ['/', '/joinGroup', '/myPage'];

function Template({ children }) {
  const headerRef = useRef(null);
  const location = useLocation();
  const [isFontWhite, setIsFontWhite] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 624);
  const [isSearchBarVisible, setIsSearchBarVisible] = useRecoilState(isSearchBarVisibleState);
  const [visibility, setVisibility] = useState(isSearchBarVisible && isMobile);

  const handleSearchBarVisibility = useCallback(() => {
    setVisibility((prevVisibility) => !prevVisibility);

    const timeout = setTimeout(() => {
      setIsSearchBarVisible((prevVisibility) => !prevVisibility);
      clearTimeout(timeout);
      setVisibility((prevVisibility) => !prevVisibility);
    }, 200);
  }, [setIsSearchBarVisible, isMobile]);

  useEffect(() => {
    if (PATH_NAMES.includes(location.pathname)) return setIsFontWhite(true);
    setIsFontWhite(false);
  }, [location]);

  useEffect(() => {
    const changeHeaderBackground = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const handleScreenResize = () => {
      if (window.innerWidth >= 624) {
        setIsMobile(false);
        setIsSearchBarVisible(false);
        return;
      }

      setIsMobile(true);
    };

    window.addEventListener('scroll', changeHeaderBackground);
    window.addEventListener('resize', handleScreenResize);

    return () => {
      window.removeEventListener('scroll', changeHeaderBackground);
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  return (
    <S.Template>
      <S.HeaderContainer ref={headerRef} isFontWhite={isFontWhite} isScrolled={isScrolled}>
        {isSearchBarVisible && isMobile ? (
          <S.MobileSearchBarContainer isVisible={visibility}>
            <Icon name='arrow-left' size='medium' isPointer onClick={handleSearchBarVisibility} />
            <SearchBar />
          </S.MobileSearchBarContainer>
        ) : (
          <>
            <Logo />
            {isMobile ? <span /> : <SearchBar />}
            <UserNav />
          </>
        )}
      </S.HeaderContainer>
      {children}
    </S.Template>
  );
}

export default Template;
