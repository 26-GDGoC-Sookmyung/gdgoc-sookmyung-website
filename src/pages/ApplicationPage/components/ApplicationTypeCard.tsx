import type { ApplicationTypeOption } from '@/types/application';

import styles from '../ApplicationPage.module.css';

type ApplicationTypeCardProps = {
  option: ApplicationTypeOption;
  onSelect: (option: ApplicationTypeOption) => void;
};

export function ApplicationTypeCard({
  option,
  onSelect,
}: ApplicationTypeCardProps) {
  return (
    <button
      className={styles.applicationTypeCard}
      type="button"
      onClick={() => onSelect(option)}
    >
      <span className={styles.cardLogoBox}>
        <img
          className={styles.cardLogo}
          src={option.imageSrc}
          alt=""
          aria-hidden="true"
        />
      </span>

      <span className={styles.cardTitle}>
        {option.titleLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>

      <span className={styles.cardPeriod}>{option.recruitmentPeriod}</span>
    </button>
  );
}
