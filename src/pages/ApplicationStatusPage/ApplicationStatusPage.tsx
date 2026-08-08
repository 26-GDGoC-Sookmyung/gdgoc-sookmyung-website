import { useEffect, useState } from 'react';

import type { ApplicationSummary } from '@/types/application';

import styles from './ApplicationStatusPage.module.css';
import { getApplicationSummaries } from './applicationStatusApi';
import { ApplicationStatusCard } from './components/ApplicationStatusCard';

export function ApplicationStatusPage() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    getApplicationSummaries(abortController.signal)
      .then((applicationSummaries) => {
        if (abortController.signal.aborted) {
          return;
        }

        setApplications(applicationSummaries);
        setErrorMessage('');
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setApplications([]);
        setErrorMessage('지원 현황을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

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

        {isLoading ? (
          <p className={styles.statusMessage}>지원 현황을 불러오는 중입니다.</p>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className={styles.statusMessage}>{errorMessage}</p>
        ) : null}

        {!isLoading && !errorMessage && applications.length === 0 ? (
          <p className={styles.statusMessage}>작성 중이거나 제출한 지원서가 없습니다.</p>
        ) : null}

        {!isLoading && !errorMessage && applications.length > 0 ? (
          <div className={styles.statusList}>
            {applications.map((application) => (
              <ApplicationStatusCard
                application={application}
                key={application.id}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
