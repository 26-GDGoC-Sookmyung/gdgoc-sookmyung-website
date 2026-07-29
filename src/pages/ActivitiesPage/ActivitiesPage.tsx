import { useMemo, useState } from 'react';

import type { ActivityQuarter } from '@/types/activity';

import styles from './ActivitiesPage.module.css';
import { activities, activityQuarters } from './activitiesData';
import { ActivityCard } from './components/ActivityCard';

const activityImageModules = import.meta.glob(
  '/src/assets/images/activities/**/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>;

function getActivityImage(
  quarter: ActivityQuarter,
  imageFileName: string,
): string | undefined {
  const imageEntry = Object.entries(activityImageModules).find(
    ([path]) => {
      const normalizedPath = path.normalize('NFC').toLowerCase();
      const normalizedFileName = imageFileName.normalize('NFC').toLowerCase();

      return (
        normalizedPath.includes(`/activities/${quarter.toLowerCase()}/`) &&
        normalizedPath.endsWith(normalizedFileName)
      );
    },
  );

  return imageEntry?.[1];
}

export function ActivitiesPage() {
  const [selectedQuarter, setSelectedQuarter] =
    useState<ActivityQuarter>('Q1');
  const selectedActivities = useMemo(
    () =>
      activities.filter((activity) => activity.quarter === selectedQuarter),
    [selectedQuarter],
  );

  return (
    <>
      <section className={styles.hero} aria-labelledby="activities-hero-title">
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle} id="activities-hero-title">
            <span>GDGoC는</span>
            <span>혁신적인 성장을</span>
            <span>도모합니다.</span>
          </h1>

          <div className={styles.heroDivider} aria-hidden="true" />

          <p className={styles.heroDescription}>
            <span>GDGoC에서는</span>
            <span>정기 세미나, 스터디, 스피커 세션,</span>
            <span>커뮤니티 및 연합 이벤트를 통해</span>
            <span>다양한 경험을 제공합니다.</span>
          </p>
        </div>
      </section>

      <section className={styles.activities} aria-labelledby="activities-title">
        <div className={styles.activitiesInner}>
          <div className={styles.heading}>
            <p className={styles.sectionLabel}>What We Do</p>
            <h2 className={styles.sectionTitle} id="activities-title">
              지난 6기의 활동을 소개합니다
            </h2>
            <p className={styles.sectionDescription}>
              <span>
                GDG on Campus의 학생들은 peer-to-peer 학습 환경에서 역량을 키우고
              </span>
              <span>공동체와 지역사회를 위한 솔루션 구축을 목표로 합니다.</span>
            </p>
          </div>

          <div className={styles.quarterTabs} aria-label="분기별 활동 보기">
            {activityQuarters.map((quarter) => (
              <button
                className={`${styles.quarterTab} ${
                  selectedQuarter === quarter.id ? styles.quarterTabActive : ''
                }`}
                type="button"
                aria-pressed={selectedQuarter === quarter.id}
                onClick={() => setSelectedQuarter(quarter.id)}
                key={quarter.id}
              >
                {quarter.label}
              </button>
            ))}
          </div>

          <div className={styles.activityGrid}>
            {selectedActivities.map((activity) => (
              <ActivityCard
                activity={activity}
                imageSrc={getActivityImage(
                  activity.quarter,
                  activity.imageFileName,
                )}
                key={activity.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
