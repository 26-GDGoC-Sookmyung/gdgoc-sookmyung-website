import styles from '../AboutPage.module.css';
import { goalCards } from './aboutData';

export function GoalsSection() {
  return (
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
  );
}
