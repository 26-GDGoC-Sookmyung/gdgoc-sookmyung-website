import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header/Header';
import styles from './RootLayout.module.css';

export function RootLayout() {
  const { pathname } = useLocation();
  const shouldHideFooter = pathname.startsWith('/application');

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {shouldHideFooter ? null : <Footer />}
    </div>
  );
}
