import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import gdgLogo from '@/assets/icons/header/light/gdg_logo.svg';
import userMenuChevron from '@/assets/icons/header/user-menu-chevron.svg';
import styles from './Header.module.css';

const navigationItems = [
  { label: 'ABOUT US', path: '/about' },
  { label: 'ACTIVITIES', path: '/activities' },
  { label: 'MEMBERS', path: '/members' },
  { label: 'RECRUIT', path: '/recruit' },
];

const MOCK_USER = { applicationType: 'member', name: '홍길동' } as const;

export function Header() {
  const [currentUser, setCurrentUser] = useState<{
    applicationType: 'member' | 'team-member';
    name: string;
  } | null>(MOCK_USER);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isUserMenuOpen) return;

    const closeMenuOnOutsideClick = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
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
                    onClick={() => {
                      setCurrentUser(null);
                      setIsUserMenuOpen(false);
                    }}
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
      </div>
    </header>
  );
}
