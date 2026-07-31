import activitiesMarkerIcon from '@/assets/icons/home/activities-marker.svg';
import activitiesTimelineIcon from '@/assets/icons/home/activities-timeline.svg';

import styles from '../HomePage.module.css';
import { activityQuarters } from './homeData';

export function ActivitiesSection() {
  return (
    <section
      className={styles.activities}
      id="activities"
      aria-labelledby="activities-title"
    >
      <div className={styles.activitiesInner}>
        <div className={styles.activitiesHeading}>
          <p className={styles.sectionLabel}>ACTIVITIES</p>
          <h2 className={styles.sectionTitle} id="activities-title">
            연간 활동
          </h2>
        </div>

        <div className={styles.timeline} aria-label="분기별 연간 활동">
          <img
            className={styles.timelineLine}
            src={activitiesTimelineIcon}
            alt=""
            aria-hidden="true"
          />

          <div className={styles.timelineGrid}>
            {activityQuarters.map((item) => (
              <section className={styles.quarter} key={item.quarter}>
                <h3 className={styles.quarterTitle}>{item.quarter}</h3>
                <img
                  className={styles.quarterMarker}
                  src={activitiesMarkerIcon}
                  alt=""
                  aria-hidden="true"
                />
                <p className={styles.quarterPeriod}>{item.period}</p>
                <ul className={styles.activityList}>
                  {item.activities.map((activity) => (
                    <li className={styles.activityItem} key={activity}>
                      {activity.split('\n').map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
