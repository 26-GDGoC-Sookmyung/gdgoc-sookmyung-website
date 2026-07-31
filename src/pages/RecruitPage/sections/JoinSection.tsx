import joinCardIcon from '@/assets/icons/recruit/join-card.svg';

import styles from '../RecruitPage.module.css';
import { joinCards } from './recruitData';
import { SectionHeading } from './SectionHeading';

export function JoinSection() {
  return (
    <section className={styles.joinSection} aria-labelledby="join-title">
      <div className={styles.joinInner}>
        <div id="join-title">
          <SectionHeading
            label="Join us"
            title={
              <>
                GDGoC Sookmyung
                <br className={styles.mobileBreak} /> 7기 안내
              </>
            }
          />
        </div>

        <div className={styles.joinCards}>
          {joinCards.map((card) => (
            <article className={styles.joinCard} key={card.title}>
              <img
                className={styles.joinCardIcon}
                src={joinCardIcon}
                alt=""
                aria-hidden="true"
              />
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
