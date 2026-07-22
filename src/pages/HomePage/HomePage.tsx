import { Link } from 'react-router-dom';

import aboutArrowIcon from '@/assets/icons/home/about-arrow.svg';
import activitiesMarkerIcon from '@/assets/icons/home/activities-marker.svg';
import activitiesTimelineIcon from '@/assets/icons/home/activities-timeline.svg';
import heroGdgImage from '@/assets/images/home/hero-gdg.png';

import styles from './HomePage.module.css';

const activityQuarters = [
  {
    quarter: '1분기',
    period: '2026. 09 ~ 2026. 12',
    activities: ['팀멤버 스피커 세션', '기술 스터디', '1분기 종료 & 회고'],
  },
  {
    quarter: '2분기',
    period: '2026. 01 ~ 2026. 02',
    activities: ['Mini-Project', '타 학교 GDGoC\n연합 네트워킹 활동'],
  },
  {
    quarter: '3분기',
    period: '2026. 03 ~ 2026. 06',
    activities: ['멤버 주도 스터디', '멤버 스피커 세션', '수료 및 졸업식'],
  },
];

export function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle} id="home-title">
            <span>Build.</span>
            <span>Connect.</span>
            <span>Grow.</span>
          </h1>

          <div className={styles.heroVisual} aria-hidden="true">
            <img className={styles.heroImage} src={heroGdgImage} alt="" />
          </div>
        </div>
      </section>

      <section
        className={styles.about}
        id="about"
        aria-labelledby="about-title"
      >
        <div className={styles.aboutInner}>
          <div className={styles.aboutHeading}>
            <p className={styles.sectionLabel}>ABOUT US</p>
            <h2 className={styles.sectionTitle} id="about-title">
              Google Developer Group on Campus를 소개합니다.
            </h2>
            <p className={styles.sectionDescription}>
              GDGoC(Google Developer Group on Campus)는 Google Developers가
              지원하는 대학교 개발자 커뮤니티입니다.
            </p>
          </div>

          <div className={styles.aboutCards}>
            <article className={`${styles.aboutCard} ${styles.communityCard}`}>
              <h3 className={styles.cardTitle}>Community</h3>
              <div className={styles.cardDescription}>
                <p>함께 배우고 성장하는 개발자 커뮤니티</p>
                <p>
                  스터디, 프로젝트, 세미나를 통해
                  <br />
                  혼자가 아닌 함께 성장합니다.
                </p>
              </div>
              <Link className={styles.aboutLink} to="/about">
                <span>더 알아보기</span>
                <img src={aboutArrowIcon} alt="" aria-hidden="true" />
              </Link>
            </article>

            <div className={styles.aboutCardColumn}>
              <article
                className={`${styles.aboutCard} ${styles.activitiesCard}`}
              >
                <h3 className={styles.cardTitle}>Activities</h3>
                <p className={styles.cardDescription}>
                  정기 세미나 · 기술 스터디 · 프로젝트
                  <br />
                  AI/ML, FE, BE 등 관심 기술을 함께 탐구합니다.
                </p>
              </article>

              <article className={`${styles.aboutCard} ${styles.networkCard}`}>
                <h3 className={styles.cardTitle}>Network</h3>
                <p className={styles.cardDescription}>
                  전국 GDG 및 다양한 개발자들과의 교류
                  <br />
                  연합 세션, 연합 프로젝트, 해커톤 등을 통한 네트워크 확장 기회
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
