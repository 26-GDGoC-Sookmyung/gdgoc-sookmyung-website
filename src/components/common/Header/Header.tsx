import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { ApiError } from '@/api/apiTypes';
import { accessTokenStorage } from '@/api/tokenStorage';
import { getCurrentUser, type CurrentUser } from '@/api/userApi';
import gdgLogo from '@/assets/icons/header/light/gdg_logo.svg';
import userMenuChevron from '@/assets/icons/header/user-menu-chevron.svg';
import styles from './Header.module.css';

const navigationItems = [
  { label: 'ABOUT US', path: '/about' },
  { label: 'ACTIVITIES', path: '/activities' },
  { label: 'MEMBERS', path: '/members' },
  { label: 'RECRUIT', path: '/recruit' },
];

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let isActive = true;

    if (!accessTokenStorage.get()) {
      setCurrentUser(null);
      return;
    }

    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();

        if (isActive) {
          setCurrentUser(user);
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        setCurrentUser(null);

        if (error instanceof ApiError && [401, 403].includes(error.status)) {
          accessTokenStorage.remove();
        }
      }
    };

    void loadCurrentUser();

    return () => {
      isActive = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const closeMenuOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !userMenuRef.current?.contains(target) &&
        !mobileUserMenuRef.current?.contains(target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeMenuOnOutsideClick);
    document.addEventListener('keydown', closeMenuOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeMenuOnOutsideClick);
      document.removeEventListener('keydown', closeMenuOnEscape);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const mobileMenuButton = mobileMenuButtonRef.current;
    const desktopMediaQuery = window.matchMedia('(min-width: 1001px)');
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    const trapFocusInMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements =
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeMenuOnEscape);
    document.addEventListener('keydown', trapFocusInMenu);
    desktopMediaQuery.addEventListener('change', closeMenuOnDesktop);
    mobileMenuCloseButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeMenuOnEscape);
      document.removeEventListener('keydown', trapFocusInMenu);
      desktopMediaQuery.removeEventListener('change', closeMenuOnDesktop);

      if (window.matchMedia('(max-width: 1000px)').matches) {
        mobileMenuButton?.focus();
      }
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const logout = () => {
    accessTokenStorage.remove();
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to="/">
          <img
            className={styles.logoMark}
            src={gdgLogo}
            alt="Google Developer Group Sookmyung Women's University"
          />
        </Link>
        <nav className={styles.nav} aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.navItem} ${styles.navItemActive}`
                  : styles.navItem
              }
              to={item.path}
              key={item.path}
            >
              {item.label}
            </NavLink>
          ))}
          {currentUser ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <button
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                className={styles.userMenuButton}
                onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
                type="button"
              >
                <span>{currentUser.name} 님</span>
                <img
                  alt=""
                  aria-hidden="true"
                  className={`${styles.userMenuChevron} ${
                    isUserMenuOpen ? styles.userMenuChevronOpen : ''
                  }`}
                  src={userMenuChevron}
                />
              </button>

              {isUserMenuOpen ? (
                <div className={styles.userMenuDropdown} role="menu">
                  <Link
                    className={styles.userMenuItem}
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    to="/application/status"
                  >
                    지원현황
                  </Link>
                  <button
                    className={styles.userMenuItem}
                    onClick={logout}
                    role="menuitem"
                    type="button"
                  >
                    로그아웃
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.loginButton} ${styles.loginButtonActive}`
                  : styles.loginButton
              }
              to="/login"
            >
              LOGIN
            </NavLink>
          )}
        </nav>

        <div className={styles.mobileActions}>
          {currentUser ? (
            <div
              className={`${styles.userMenu} ${styles.mobileUserMenu}`}
              ref={mobileUserMenuRef}
            >
              <button
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                className={styles.userMenuButton}
                onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
                type="button"
              >
                <span>{currentUser.name} 님</span>
                <img
                  alt=""
                  aria-hidden="true"
                  className={`${styles.userMenuChevron} ${
                    isUserMenuOpen ? styles.userMenuChevronOpen : ''
                  }`}
                  src={userMenuChevron}
                />
              </button>

              {isUserMenuOpen ? (
                <div className={styles.userMenuDropdown} role="menu">
                  <Link
                    className={styles.userMenuItem}
                    onClick={() => setIsUserMenuOpen(false)}
                    role="menuitem"
                    to="/application/status"
                  >
                    지원현황
                  </Link>
                  <button
                    className={styles.userMenuItem}
                    onClick={logout}
                    role="menuitem"
                    type="button"
                  >
                    로그아웃
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileHeaderLoginButton} ${styles.mobileHeaderLoginButtonActive}`
                  : styles.mobileHeaderLoginButton
              }
              to="/login"
            >
              LOGIN
            </NavLink>
          )}
          <button
            aria-controls="mobile-primary-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="메뉴 열기"
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(true)}
            ref={mobileMenuButtonRef}
            type="button"
          >
            <span className={styles.hamburgerIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ''
        }`}
        id="mobile-primary-menu"
        ref={mobileMenuRef}
      >
        <div className={styles.mobileMenuHeader}>
          <Link
            className={styles.mobileMenuLogo}
            onClick={closeMobileMenu}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            to="/"
          >
            <img
              src={gdgLogo}
              alt="Google Developer Group Sookmyung Women's University"
            />
          </Link>
          <button
            aria-label="메뉴 닫기"
            className={styles.mobileMenuCloseButton}
            onClick={closeMobileMenu}
            ref={mobileMenuCloseButtonRef}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            type="button"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="모바일 주요 메뉴">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavItem} ${styles.mobileNavItemActive}`
                  : styles.mobileNavItem
              }
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              to={item.path}
              key={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
