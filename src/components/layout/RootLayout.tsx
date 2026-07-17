import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/common/Footer/Footer';
import { Header } from '@/components/common/Header/Header';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
