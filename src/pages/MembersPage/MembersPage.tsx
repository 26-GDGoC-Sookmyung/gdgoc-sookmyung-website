import styles from './MembersPage.module.css';
import { MemberCard } from './components/MemberCard';
import { members } from './membersData';

const memberImageModules = import.meta.glob('/src/assets/images/members/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const fallbackImage =
  memberImageModules['/src/assets/images/members/member_basic_img.png'];

function getMemberImage(imageKey?: string) {
  if (!imageKey) {
    return fallbackImage;
  }

  const imageEntry = Object.entries(memberImageModules).find(([path]) =>
    path.includes(imageKey),
  );

  return imageEntry?.[1] ?? fallbackImage;
}

export function MembersPage() {
  return (
    <section className={styles.membersPage} aria-labelledby="members-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>Members</p>
          <h1 className={styles.title} id="members-title">
            GDGoC Sookmyung 6기 멤버들을 소개합니다.
          </h1>
        </div>

        <div className={styles.memberGrid}>
          {members.map((member) => (
            <MemberCard
              member={member}
              imageSrc={getMemberImage(member.imageKey)}
              key={member.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
