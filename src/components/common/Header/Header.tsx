import { Link, NavLink } from 'react-router-dom';

import gdgLogo from '@/assets/icons/header/light/gdg_logo.svg';
import styles from './Header.module.css';

const navigationItems = [
  { label: 'ABOUT US', path: '/about' },
  { label: 'ACTIVITIES', path: '/activities' },
  { label: 'MEMBERS', path: '/members' },
  { label: 'RECRUIT', path: '/recruit' },
];

export function Header() {
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
        </nav>
      </div>
    </header>
  );
}
