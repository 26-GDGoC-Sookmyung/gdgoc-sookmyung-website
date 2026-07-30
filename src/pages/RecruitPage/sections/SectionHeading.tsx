import type { ReactNode } from 'react';

import styles from '../RecruitPage.module.css';

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  align?: 'center' | 'left';
};

export function SectionHeading({
  label,
  title,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.sectionHeading} ${
        align === 'left' ? styles.sectionHeadingLeft : ''
      }`}
    >
      <p className={styles.sectionLabel}>{label}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}
