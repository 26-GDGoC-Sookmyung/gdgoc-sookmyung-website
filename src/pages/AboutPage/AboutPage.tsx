import {
  arrowRight,
  arrowUp,
  blueCircle,
  blueSemicircle,
  blueTriangle,
  dash,
  greenCircle,
  greenSemicircle,
  goalConnectionsBurst,
  goalGrowBurst,
  goalLearnBurst,
  goalShareBurst,
  leftRing,
  orangeCircle,
  orangeDot,
  orangeTriangle,
  star,
  targetLine,
  targetRing,
  underline,
  whiteRing,
  xLineA,
  xLineB,
  yellowPanel,
} from '@/assets/icons/about';

import styles from './AboutPage.module.css';

const communityStats = [
  { label: '누적 활동 인원', value: '100명+' },
  { label: '운영 기간', value: '6년' },
  { label: '함께 하고 있는 학교 수', value: '37개' },
];

const goalCards = [
  {
    id: 'grow',
    title: 'Grow Together',
    description: ["‘함께 성장하는 것'의", '중요성을 알고', '실천하는 커뮤니티'],
    icon: goalGrowBurst,
    artworkPosition: 'left',
  },
  {
    id: 'learn',
    title: 'Learn by Building',
    description: [
      '스터디와 프로젝트를 통해',
      '개발 경험과',
      '프로그래밍 실력을',
      '기를 수 있는 커뮤니티',
    ],
    icon: goalLearnBurst,
    artworkPosition: 'left',
  },
  {
    id: 'connections',
    title: 'Meaningful Connections',
    description: [
      '다양한 사람들과',
      '커뮤니케이션하며',
      '서로에게 도움이 될 수 있는',
      '커뮤니티',
    ],
    icon: goalConnectionsBurst,
    artworkPosition: 'right',
  },
  {
    id: 'share',
    title: 'Share and Grow',
    description: ['지식을 공유하며', '성장할 수 있는 커뮤니티'],
    icon: goalShareBurst,
    artworkPosition: 'right',
  },
] as const;

export function AboutPage() {
  return (
    <>
      <section className={styles.aboutHero} aria-labelledby="about-page-title">
        <div className={styles.artboard}>
          <h1 className={styles.title} id="about-page-title">
            <span className={styles.google}>Google</span>
            <span className={styles.developer}>Developer</span>
            <span className={styles.groups}>Groups on</span>
            <span className={styles.campus}>Campus</span>
          </h1>

          <img
            className={styles.orangeCircle}
            src={orangeCircle}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.leftRing}
            src={leftRing}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.arrowRight}
            src={arrowRight}
            alt=""
            aria-hidden="true"
          />

          <img
            className={styles.arrowUp}
            src={arrowUp}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.blueCircle}
            src={blueCircle}
            alt=""
            aria-hidden="true"
          />
          <span className={styles.cross} aria-hidden="true">
            <img src={xLineA} alt="" />
            <img src={xLineB} alt="" />
          </span>
          <img
            className={styles.greenCircle}
            src={greenCircle}
            alt=""
            aria-hidden="true"
          />

          <img
            className={styles.greenSemicircle}
            src={greenSemicircle}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.blueSemicircle}
            src={blueSemicircle}
            alt=""
            aria-hidden="true"
          />

          <span className={styles.target} aria-hidden="true">
            <span className={styles.yellowPanel}>
              <img src={yellowPanel} alt="" />
            </span>
            <img className={styles.whiteRing} src={whiteRing} alt="" />
            <img className={styles.orangeDot} src={orangeDot} alt="" />
            <img className={styles.targetRing} src={targetRing} alt="" />
            <img className={styles.targetLine} src={targetLine} alt="" />
            <img className={styles.targetDashOne} src={dash} alt="" />
            <img className={styles.targetDashTwo} src={dash} alt="" />
          </span>

          <img
            className={styles.underline}
            src={underline}
            alt=""
            aria-hidden="true"
          />
          <img className={styles.star} src={star} alt="" aria-hidden="true" />
          <img
            className={styles.orangeTriangle}
            src={orangeTriangle}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.blueTriangle}
            src={blueTriangle}
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section
        className={styles.communityIntro}
        aria-labelledby="community-intro-title"
      >
        <div className={styles.communityIntroInner}>
          <div className={styles.communityIntroHeading}>
            <p className={styles.communityIntroLabel}>GDG on Campus는</p>
            <h2
              className={styles.communityIntroTitle}
              id="community-intro-title"
            >
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

      <section className={styles.goals} aria-labelledby="goals-title">
        <div className={styles.goalsInner}>
          <div className={styles.goalsHeading}>
            <p className={styles.goalsLabel}>GOAL</p>
            <h2 className={styles.goalsTitle} id="goals-title">
              GDG on Campus Sookmyung은 다음과 같은 목표를 갖고 있습니다.
            </h2>
            <p className={styles.goalsDescription}>
              GDG on Campus의 학생들은 peer-to-peer 학습 환경에서 역량을 키우고
              공동체와 지역사회를 위한 솔루션 구축을 목표로 합니다.
            </p>
          </div>

          <div className={styles.goalGrid}>
            {goalCards.map((card) => (
              <article
                className={`${styles.goalCard} ${styles[`goalCard${card.id[0].toUpperCase()}${card.id.slice(1)}`]}`}
                key={card.id}
              >
                <h3 className={styles.goalCardTitle}>{card.title}</h3>
                <p className={styles.goalCardDescription}>
                  {card.description.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <span
                  className={`${styles.goalBurst} ${card.artworkPosition === 'right' ? styles.goalBurstRight : styles.goalBurstLeft}`}
                  aria-hidden="true"
                >
                  <img src={card.icon} alt="" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
