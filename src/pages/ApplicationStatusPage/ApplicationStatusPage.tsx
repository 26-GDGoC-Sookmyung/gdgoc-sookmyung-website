import styles from './ApplicationStatusPage.module.css';
import { applicationSummaries } from './applicationStatusData';
import { ApplicationStatusCard } from './components/ApplicationStatusCard';

export function ApplicationStatusPage() {
  return (
    <section
      className={styles.applicationStatusPage}
      aria-labelledby="application-status-title"
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h1 className={styles.title} id="application-status-title">
            지원 현황
          </h1>
          <p className={styles.description}>이미 제출한 지원서가 있습니다.</p>
        </div>

        <div className={styles.statusList}>
          {applicationSummaries.map((application) => (
            <ApplicationStatusCard
              application={application}
              key={application.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
