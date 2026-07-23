import {
  arrowRight,
  arrowUp,
  blueCircle,
  blueSemicircle,
  blueTriangle,
  conductPersonIcon,
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

const conductRules = [
  {
    title: '사람을 존중해주세요.',
    details: [
      '모든 일 뒤에는 사람이 있습니다.',
      '어떤 일에서도 사람을 우선적으로 생각해주세요.',
      '모두가 커뮤니티에 참여할 수 있어야합니다.',
      '다른 사람의 가치관, 문화, 일을 존중해주세요.',
    ],
  },
  {
    title: '사람에게 친절하게 대해주세요.',
    details: [
      '사람을 정중하게 대해주세요.',
      '새로운 사람에게 친절하게 대해주세요.',
      '어떤 질문에도 친절하게 대해주세요.',
    ],
  },
  {
    title: '다른 사람의 이야기를 잘 들어주세요.',
    details: [
      '모든 사람들의 의견을 잘 들어주세요.',
      '모든 사람에게는 발언권이 있고, 모두가 말할 권리가 있습니다.',
    ],
  },
  {
    title: '적극적으로 참여해주세요.',
    details: [
      '적극적인 참여는 서로의 거리를 줄이고 보다 큰 가치를 만들어 냅니다. 적극적으로 참여하며 조화롭게 어울려주세요.',
    ],
  },
];

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

      <section
        className={styles.conduct}
        aria-labelledby="code-of-conduct-title"
      >
        <div className={styles.conductInner}>
          <div className={styles.conductHeading}>
            <p>Code Of Conduct</p>
            <h2 id="code-of-conduct-title">활동 규칙</h2>
          </div>

          <div className={styles.conductCards}>
            {conductRules.map((rule) => (
              <article className={styles.conductCard} key={rule.title}>
                <div className={styles.conductCardHeader}>
                  <span className={styles.conductIcon} aria-hidden="true">
                    <img src={conductPersonIcon} alt="" />
                  </span>
                  <h3>{rule.title}</h3>
                </div>
                <ul className={styles.conductCardList}>
                  {rule.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.conductNotice}>
            <p>
              만약 GDG on Campus Sookmyung 및 GDG on Campus Korea에서 어떠한
              경로라도 불편함이나 불쾌함을 겪으셨다면,
              <br />
              GDG on Campus Sookmyung 및 GDG on Campus Korea 커뮤니티 팀에게
              알려주세요.
            </p>
            <p>
              커뮤니티 팀에서는 신속하게 이슈를 파악하고, 해결 방법을 검토한 후
              처리 결과를 신고해주신 분에게 알려드릴 예정입니다.
            </p>
            <p>
              GDGoC Sookmyung Women's University는 Google과 독립적인 단체로,
              <br />
              GDGoC Sookmyung Women's University에서 진행하는 활동과 발표는
              Google과 직접적인 관련이 없습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
