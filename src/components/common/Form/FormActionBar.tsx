import type { ReactNode } from 'react';

import styles from './Form.module.css';

type FormActionBarProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export function FormActionBar({ left, right }: FormActionBarProps) {
  return (
    <div className={styles.actionBar}>
      {left}
      <div className={styles.actionSpacer} />
      {right}
    </div>
  );
}
