import styles from '../AboutPage.module.css';
import { communityStats } from './aboutData';

export function CommunityIntroSection() {
  return (
    <section
      className={styles.communityIntro}
      aria-labelledby="community-intro-title"
    >
      <div className={styles.communityIntroInner}>
        <div className={styles.communityIntroHeading}>
          <p className={styles.communityIntroLabel}>GDG on Campus는</p>
          <h2 className={styles.communityIntroTitle} id="community-intro-title">
            Google Developers가 지원하는 대학교 개발자 커뮤니티입니다.
          </h2>
          <p className={styles.communityIntroDescription}>
            Google은 GDG on Campus를 소유하거나 관리하지 않습니다. GDG on
            Campus는 학생들의 커뮤니티입니다.
          </p>
        </div>

        <dl className={styles.communityStats}>
          {communityStats.map((stat) => (
            <div className={styles.communityStat} key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
