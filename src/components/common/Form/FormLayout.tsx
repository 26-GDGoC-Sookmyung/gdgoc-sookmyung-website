import type { ReactNode } from 'react';

import styles from './Form.module.css';

type FormLayoutProps = {
  children: ReactNode;
};

export function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className={styles.formLayout}>
      <div className={styles.formInner}>{children}</div>
    </div>
  );
}
