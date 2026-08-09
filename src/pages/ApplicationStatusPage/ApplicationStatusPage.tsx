import { useEffect, useState } from 'react';

import type { ApplicationSummary } from '@/types/application';

import styles from './ApplicationStatusPage.module.css';
import { getApplicationSummaries } from './applicationStatusApi';
import { ApplicationStatusCard } from './components/ApplicationStatusCard';

export function ApplicationStatusPage() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const statusDescription = getStatusDescription(
    applications,
    isLoading,
    errorMessage,
  );

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
          <p className={styles.description}>{statusDescription}</p>
        </div>

        {isLoading ? (
          <p className={styles.statusMessage}>지원 현황을 불러오는 중입니다.</p>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className={styles.statusMessage}>{errorMessage}</p>
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

function getStatusDescription(
  applications: ApplicationSummary[],
  isLoading: boolean,
  errorMessage: string,
) {
  if (isLoading) {
    return '지원 현황을 확인하고 있습니다.';
  }

  if (errorMessage) {
    return '지원 현황을 불러오지 못했습니다.';
  }

  if (applications.some((application) => application.progressStatus === 'submitted')) {
    return '이미 제출한 지원서가 있습니다.';
  }

  if (applications.some((application) => application.progressStatus === 'draft')) {
    return '작성 중인 지원서가 있습니다.';
  }

  return '작성 중이거나 제출한 지원서가 없습니다.';
}
