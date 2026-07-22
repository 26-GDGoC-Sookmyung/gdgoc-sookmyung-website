import { Link } from 'react-router-dom';

import recruitArrowIcon from '@/assets/icons/home/recruit-arrow.svg';
import recruitBurstIcon from '@/assets/icons/home/recruit-burst.svg';

import styles from './RecruitSection.module.css';
import { useCountdown } from './useCountdown';

export function RecruitSection() {
  const countdown = useCountdown();

  return (
    <section
      className={styles.recruit}
      id="recruit"
      aria-labelledby="recruit-title"
    >
      <div className={styles.recruitInner}>
        <div className={styles.recruitHeading}>
          <p className={styles.sectionLabel}>Recruit</p>
          <h2 className={styles.sectionTitle} id="recruit-title">
            GDGoC Sookmyung 26-27 모집
          </h2>
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

        <Link className={styles.recruitLink} to="/recruit">
          <span>모집공고 바로가기</span>
          <img src={recruitArrowIcon} alt="" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
