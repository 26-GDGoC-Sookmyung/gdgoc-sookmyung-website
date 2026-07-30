import type { Activity } from '@/types/activity';

import styles from '../ActivitiesPage.module.css';

type ActivityCardProps = {
  activity: Activity;
  imageSrc?: string;
};

export function ActivityCard({ activity, imageSrc }: ActivityCardProps) {
  return (
    <article className={styles.activityCard}>
      <div className={styles.activityImageBox}>
        <img
          className={styles.activityImage}
          src={imageSrc}
          alt={`${activity.title} 활동 사진`}
        />
      </div>

      <div className={styles.activityContent}>
        <span className={styles.activityPeriod}>{activity.period}</span>
        <h3 className={styles.activityTitle}>{activity.title}</h3>
        <p className={styles.activityDescription}>
          {activity.description.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </article>
  );
}
