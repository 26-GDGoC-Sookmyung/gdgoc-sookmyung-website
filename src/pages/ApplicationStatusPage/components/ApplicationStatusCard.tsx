import { Link } from 'react-router-dom';

import type { ApplicationSummary } from '@/types/application';

import styles from '../ApplicationStatusPage.module.css';

type ApplicationStatusCardProps = {
  application: ApplicationSummary;
};

export function ApplicationStatusCard({
  application,
}: ApplicationStatusCardProps) {
  const isSubmitted = application.progressStatus === 'submitted';
  const isClosed = application.recruitmentStatus === 'closed';
  const statusText = isClosed ? '모집 마감' : application.dDayText;

  return (
    <article className={styles.statusCard}>
      <div className={styles.applicationMeta}>
        <div className={styles.typeRow}>
          <h2 className={styles.applicationType}>{application.type}</h2>
          <span className={styles.deadline}>{statusText}</span>
        </div>
        <p className={styles.period}>{application.recruitmentPeriod}</p>
      </div>

      <div className={styles.statusRow}>
        <div className={styles.statusInfo}>
          <p className={styles.statusBadge}>{application.statusLabel}</p>
          <p className={styles.updatedAt}>{application.updatedAtLabel}</p>
        </div>

        <div className={styles.actions}>
          {isSubmitted && !isClosed ? (
            <Link
              className={`${styles.actionButton} ${styles.secondaryButton}`}
              to={`/application/${application.routeSlug}?mode=edit`}
            >
              지원서 수정
            </Link>
          ) : null}

          {isSubmitted || !isClosed ? (
            <Link
              className={`${styles.actionButton} ${
                isSubmitted ? styles.darkButton : styles.primaryButton
              }`}
              to={
                isSubmitted
                  ? `/application/${application.routeSlug}?mode=preview`
                  : `/application/${application.routeSlug}`
              }
            >
              {isSubmitted ? '지원서 확인' : '이어서 작성'}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
