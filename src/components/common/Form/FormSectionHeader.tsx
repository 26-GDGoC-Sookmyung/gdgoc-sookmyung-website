import type { ReactNode } from 'react';

import styles from './Form.module.css';

type FormSectionHeaderProps = {
  title: string;
  description?: ReactNode;
};

export function FormSectionHeader({
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <header className={styles.sectionHeader}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      {description ? (
        <p className={styles.sectionDescription}>{description}</p>
      ) : null}
    </header>
  );
}
