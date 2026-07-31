import { conductPersonIcon } from '@/assets/icons/about';

import styles from '../AboutPage.module.css';
import { conductRules } from './aboutData';

export function CodeOfConductSection() {
  return (
    <section className={styles.conduct} aria-labelledby="code-of-conduct-title">
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
  );
}
