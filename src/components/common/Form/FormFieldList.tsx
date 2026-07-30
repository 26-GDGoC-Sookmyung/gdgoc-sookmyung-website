import type { ReactNode } from 'react';

import styles from './Form.module.css';

type FormFieldListProps = {
  children: ReactNode;
};

export function FormFieldList({ children }: FormFieldListProps) {
  return <div className={styles.fieldList}>{children}</div>;
}
