import { Link } from 'react-router-dom';

import recruitArrowIcon from '@/assets/icons/home/recruit-arrow.svg';
import recruitBurstIcon from '@/assets/icons/home/recruit-burst.svg';

import styles from './RecruitSection.module.css';
import { useCountdown } from './useCountdown';

type RecruitSectionProps = {
  variant?: 'home' | 'page';
};

export function RecruitSection({ variant = 'home' }: RecruitSectionProps) {
  const countdown = useCountdown();
  const isRecruitPage = variant === 'page';

  return (
    <section
      className={`${styles.recruit} ${isRecruitPage ? styles.recruitPage : ''}`}
      id="recruit"
      aria-labelledby="recruit-title"
    >
      <div className={styles.recruitInner}>
        <div className={styles.recruitHeading}>
          <p className={styles.sectionLabel}>Recruit</p>
          {isRecruitPage ? (
            <h1 className={styles.sectionTitle} id="recruit-title">
              GDGoC Sookmyung 26-27 모집
            </h1>
          ) : (
            <h2 className={styles.sectionTitle} id="recruit-title">
              GDGoC Sookmyung 26-27 모집
            </h2>
          )}
          <p className={styles.sectionDescription}>
            2026년 9월부터 2027년 6월까지 10개월 동안 GDG on Campus Sookmyung과
            함께 할 눈송이를 찾습니다.
          </p>
        </div>

        <div className={styles.recruitTimerBox}>
          <div className={styles.recruitCountdown}>
            <p className={styles.recruitCountdownTitle}>7기 모집 마감까지</p>
            <p
              className={styles.recruitCountdownValue}
              role="timer"
              aria-live="off"
              aria-label={countdown.label}
            >
              {countdown.text}
            </p>
            <div className={styles.recruitCountdownUnits} aria-hidden="true">
              <span>DAY</span>
              <span>HOUR</span>
              <span>MINUTE</span>
              <span>SECOND</span>
            </div>
          </div>

          <img
            className={styles.recruitBurst}
            src={recruitBurstIcon}
            alt=""
            aria-hidden="true"
          />
        </div>

        {isRecruitPage && (
          <p className={styles.recruitNotice}>
            <span>
              ※ 상단의 모집 일정은
              <br className={styles.mobileBreak} /> Member 지원 기간을 기준으로
              <br className={styles.mobileBreak} /> 표시됩니다.
            </span>
            <span>
              Team Member 지원은
              <br className={styles.mobileBreak} /> 8월 18일 (화) 23:59에
              <br className={styles.mobileBreak} /> 조기 마감됩니다.
            </span>
          </p>
        )}

        {countdown.isExpired ? (
          <p className={`${styles.recruitLink} ${styles.recruitClosed}`}>
            모집이 마감되었습니다.
          </p>
        ) : (
          <Link
            className={styles.recruitLink}
            to={isRecruitPage ? '/application' : '/recruit'}
          >
            <span>
              {isRecruitPage ? '지원하러 바로가기' : '모집공고 바로가기'}
            </span>
            <img src={recruitArrowIcon} alt="" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
