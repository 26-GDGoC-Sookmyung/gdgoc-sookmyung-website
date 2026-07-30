import styles from '../RecruitPage.module.css';
import { roles } from './recruitData';
import { SectionHeading } from './SectionHeading';

export function RoleSection() {
  return (
    <section className={styles.roleSection} aria-labelledby="role-title">
      <div className={styles.roleInner}>
        <div id="role-title">
          <SectionHeading
            align="left"
            label="Role"
            title={
              'Team Member와 Member는 역할이 다르니,\n확인 후 구분하여 지원해주세요.'
            }
          />
        </div>

        <div className={styles.roleGrid}>
          {roles.map((role) => (
            <article className={styles.roleCard} key={role.title}>
              <h3>{role.title}</h3>
              <div className={styles.roleDescriptions}>
                {role.descriptions.map((description) => (
                  <p key={description}>{description}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
