import { Link } from 'react-router-dom';

import recruitArrowIcon from '@/assets/icons/home/recruit-arrow.svg';
import noticeIcon from '@/assets/icons/recruit/notice.svg';
import scheduleMarkerIcon from '@/assets/icons/recruit/schedule-marker.svg';

import styles from '../RecruitPage.module.css';
import type { RecruitSchedule } from './recruitData';
import { SectionHeading } from './SectionHeading';

type ScheduleSectionProps = {
  schedule: RecruitSchedule;
};

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  return (
    <section
      className={styles.scheduleSection}
      aria-label={`${schedule.activeTab} 모집 일정`}
    >
      <div className={styles.scheduleInner}>
        <SectionHeading label="Schedule" title="모집 일정" />

        <div className={styles.scheduleTabs} aria-hidden="true">
          {['Team Member', 'Member'].map((tab) => (
            <span
              className={
                tab === schedule.activeTab ? styles.scheduleTabActive : ''
              }
              key={tab}
            >
              {tab}
            </span>
          ))}
        </div>

        <ol className={styles.scheduleTimeline}>
          {schedule.stages.map((stage) => (
            <li className={styles.scheduleStage} key={stage.title}>
              <p className={styles.scheduleStageTitle}>{stage.title}</p>
              <img
                className={styles.scheduleMarker}
                src={scheduleMarkerIcon}
                alt=""
                aria-hidden="true"
              />
              <p className={styles.scheduleDate}>{stage.date}</p>
            </li>
          ))}
        </ol>

        <aside className={styles.scheduleNotice}>
          <div className={styles.scheduleNoticeTitle}>
            <img src={noticeIcon} alt="" aria-hidden="true" />
            <h3>{schedule.noticeTitle}</h3>
          </div>
          <ul>
            {schedule.noticeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <Link className={styles.applyLink} to="/recruit">
          <span>지원하러 바로가기</span>
          <img src={recruitArrowIcon} alt="" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
