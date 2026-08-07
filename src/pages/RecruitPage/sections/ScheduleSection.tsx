import { Link } from 'react-router-dom';

import recruitArrowIcon from '@/assets/icons/home/recruit-arrow.svg';
import noticeIcon from '@/assets/icons/recruit/notice.svg';
import scheduleMarkerIcon from '@/assets/icons/recruit/schedule-marker.svg';
import { useCountdown } from '@/components/sections/RecruitSection/useCountdown';

import styles from '../RecruitPage.module.css';
import type { RecruitSchedule } from './recruitData';
import { SectionHeading } from './SectionHeading';

type ScheduleSectionProps = {
  schedule: RecruitSchedule;
};

const scheduleTabs = ['Team Member', 'Member'] as const;
const scheduleSectionIds = {
  'Team Member': 'team-member-schedule',
  Member: 'member-schedule',
} as const;

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const { isExpired } = useCountdown();

  const scrollToSchedule = (tab: (typeof scheduleTabs)[number]) => {
    document
      .getElementById(scheduleSectionIds[tab])
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className={styles.scheduleSection}
      id={scheduleSectionIds[schedule.activeTab]}
      aria-label={`${schedule.activeTab} 모집 일정`}
    >
      <div className={styles.scheduleInner}>
        <SectionHeading label="Schedule" title="모집 일정" />

        <div className={styles.scheduleTabs}>
          {scheduleTabs.map((tab) => (
            <button
              type="button"
              className={
                tab === schedule.activeTab ? styles.scheduleTabActive : ''
              }
              aria-current={tab === schedule.activeTab ? 'true' : undefined}
              key={tab}
              onClick={() => scrollToSchedule(tab)}
            >
              {tab}
            </button>
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

        {isExpired ? (
          <p className={`${styles.applyLink} ${styles.applyClosed}`}>
            모집이 마감되었습니다.
          </p>
        ) : (
          <Link className={styles.applyLink} to="/application">
            <span>지원하러 바로가기</span>
            <img src={recruitArrowIcon} alt="" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
