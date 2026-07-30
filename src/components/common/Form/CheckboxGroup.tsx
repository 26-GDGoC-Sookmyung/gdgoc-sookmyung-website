import type { ReactNode } from 'react';

import styles from './Form.module.css';

type CheckboxGroupProps = {
  children: ReactNode;
  ariaLabel?: string;
};

export function CheckboxGroup({ children, ariaLabel }: CheckboxGroupProps) {
  return (
    <div className={styles.checkboxGroup} role="group" aria-label={ariaLabel}>
      {children}
    </div>
  );
}
