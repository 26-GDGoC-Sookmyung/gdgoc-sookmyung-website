import memberCardGdgLogo from '@/assets/images/members/member-card-gdg-logo.png';
import type { CSSProperties } from 'react';
import type { Member } from '@/types/member';

import styles from '../MembersPage.module.css';

type MemberCardProps = {
  member: Member;
  imageSrc: string;
};

const TAG_WIDTH_BY_POSITION: Record<number, Record<string, number>> = {
  0: {
    'AI/ML': 51,
    'App/Web': 60,
    Backend: 62,
    Spring: 51,
  },
  1: {
    Backend: 56,
    Cloud: 56,
    DevRel: 56,
    Frontend: 61,
  },
};

function getTagStyle(tag: string, index: number): CSSProperties {
  const width = TAG_WIDTH_BY_POSITION[index]?.[tag];

  return width
    ? ({ '--member-tag-width': `${width}px` } as CSSProperties)
    : {};
}

export function MemberCard({ member, imageSrc }: MemberCardProps) {
  return (
    <article className={styles.memberCard}>
      <div className={styles.memberImageBox}>
        <img
          className={styles.memberImage}
          src={imageSrc}
          alt={`${member.name} 프로필`}
        />
      </div>

      <div className={styles.memberContent}>
        <img
          className={styles.memberLogo}
          src={memberCardGdgLogo}
          alt=""
          aria-hidden="true"
        />

        <div className={styles.memberText}>
          <span className={styles.memberRole}>{member.role}</span>
          <strong className={styles.memberName}>{member.name}</strong>
        </div>

        <ul className={styles.memberTags} aria-label={`${member.name} 역할`}>
          {member.tags.map((tag, index) => (
            <li
              className={styles.memberTag}
              key={tag}
              style={getTagStyle(tag, index)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
