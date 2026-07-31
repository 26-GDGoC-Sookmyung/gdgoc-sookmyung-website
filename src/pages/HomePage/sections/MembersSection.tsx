import styles from '../HomePage.module.css';
import { memberTeams } from './homeData';
import { MemberCard } from './MemberCard';

export function MembersSection() {
  return (
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
  );
}
