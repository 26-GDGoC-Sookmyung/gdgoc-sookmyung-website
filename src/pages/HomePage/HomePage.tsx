import { useState } from 'react';
import { Link } from 'react-router-dom';

import aboutArrowIcon from '@/assets/icons/home/about-arrow.svg';
import activitiesMarkerIcon from '@/assets/icons/home/activities-marker.svg';
import activitiesTimelineIcon from '@/assets/icons/home/activities-timeline.svg';
import memberCardIcon from '@/assets/icons/home/member-card-icon.png';
import recruitArrowIcon from '@/assets/icons/home/recruit-arrow.svg';
import recruitBurstIcon from '@/assets/icons/home/recruit-burst.svg';
import heroGdgImage from '@/assets/images/home/hero-gdg.png';
import memberCardBack from '@/assets/images/home/member-card-back.png';
import memberCardBackground from '@/assets/images/home/member-card-background.png';

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

const memberTeams = [
  {
    id: 'devrel',
    name: 'DEVREL',
    descriptions: [
      '커뮤니티를 운영하고,\n성장할 수 있는 환경을 구축합니다.',
      '오거나이저와 함께\n세미나, 이벤트, 네트워킹을\n기획, 운영하는 역할을 합니다.',
    ],
  },
  {
    id: 'app-web',
    name: 'APP/WEB',
    descriptions: [
      '웹과 모바일 환경에서\n동작하는 서비스를 개발합니다.',
      'React, Flutter, Android 등\n기술 스터디를 기획하고 운영하며,\n멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
  {
    id: 'be',
    name: 'BE',
    descriptions: [
      '서비스의 핵심 로직과 서버를 개발합니다.',
      'Spring 등 백엔드 기술 스터디를 기획하고 운영하며,\n안정적이고 확장 가능한 시스템을 구축하고\n멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI/ML',
    descriptions: [
      '인공지능 기술을 활용해 문제를 해결합니다.',
      'AI·ML 기술 스터디를 기획하고 운영하며, 데이터 분석과 모델 개발을 통해 실제 서비스에 AI를 적용하고 멤버들의 성장을 돕는 역할을 합니다.',
    ],
  },
];

type MemberTeam = (typeof memberTeams)[number];

function MemberCard({ team }: { team: MemberTeam }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const descriptionId = `member-${team.id}-description`;
  const toggleCard = () => setIsFlipped((current) => !current);

  return (
    <button
      className={`${styles.memberCard} ${isFlipped ? styles.memberCardFlipped : ''}`}
      type="button"
      aria-label={`${team.name} 카드 ${isFlipped ? '앞면 보기' : '뒷면 보기'}`}
      aria-describedby={isFlipped ? descriptionId : undefined}
      aria-pressed={isFlipped}
      onClick={toggleCard}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCard();
        }
      }}
    >
      <span className={styles.memberCardInner}>
        <span
          className={`${styles.memberCardFace} ${styles.memberCardFront}`}
          aria-hidden={isFlipped}
        >
          <img
            className={styles.memberCardBackground}
            src={memberCardBackground}
            alt=""
          />
          <img className={styles.memberCardIcon} src={memberCardIcon} alt="" />
          <span className={styles.memberCardName}>{team.name}</span>
        </span>

        <span
          className={`${styles.memberCardFace} ${styles.memberCardBack}`}
          aria-hidden={!isFlipped}
        >
          <img
            className={styles.memberCardBackBackground}
            src={memberCardBack}
            alt=""
          />
          <ul className={styles.memberCardDetails} id={descriptionId}>
            {team.descriptions.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>
        </span>
      </span>
    </button>
  );
}

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

      <section
        className={styles.members}
        id="members"
        aria-labelledby="members-title"
      >
        <div className={styles.membersInner}>
          <div className={styles.membersHeading}>
            <p className={styles.sectionLabel}>MEMBERS</p>
            <h2 className={styles.sectionTitle} id="members-title">
              GDGoC Sookmyung을 이끌어나가는 운영진을 소개합니다
            </h2>
            <p className={styles.sectionDescription}>
              GDGoC Sookmyung 운영진은 네 팀으로 이루어져있으며, DevRel과 스터디
              파트별로 운영진이 구성되어 있어요.
            </p>
          </div>

          <div className={styles.membersGrid}>
            {memberTeams.map((team) => (
              <MemberCard team={team} key={team.id} />
            ))}
          </div>
        </div>
      </section>

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
              2026년 9월부터 2027년 6월까지 10개월 동안 GDG on Campus
              Sookmyung과 함께 할 눈송이를 찾습니다.
            </p>
          </div>

          <div className={styles.recruitTimerBox}>
            <div className={styles.recruitCountdown}>
              <p className={styles.recruitCountdownTitle}>7기 모집 마감까지</p>
              <p
                className={styles.recruitCountdownValue}
                aria-label="12일 5시간 30분 23초"
              >
                12:05:30:23
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
    </>
  );
}
