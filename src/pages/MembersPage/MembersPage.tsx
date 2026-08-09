import { useEffect, useState } from 'react';

import type { Member } from '@/types/member';

import styles from './MembersPage.module.css';
import { MemberCard } from './components/MemberCard';
import { getMembers } from './membersApi';
import { members } from './membersData';

const memberImageModules = import.meta.glob('/src/assets/images/members/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const fallbackImage =
  memberImageModules['/src/assets/images/members/member_basic_img.png'];

function getMemberImage(member: Member) {
  if (member.profileImageUrl) {
    return member.profileImageUrl;
  }

  const { imageKey } = member;

  if (!imageKey) {
    return fallbackImage;
  }

  const imageEntry = Object.entries(memberImageModules).find(([path]) =>
    path.includes(imageKey),
  );

  return imageEntry?.[1] ?? fallbackImage;
}

export function MembersPage() {
  const [apiMembers, setApiMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const displayedMembers = apiMembers.length > 0 ? apiMembers : members;

  useEffect(() => {
    const abortController = new AbortController();

    getMembers(abortController.signal)
      .then((nextMembers) => {
        if (abortController.signal.aborted) {
          return;
        }

        setApiMembers(nextMembers);
        setErrorMessage('');
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setApiMembers([]);
        setErrorMessage('멤버 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section className={styles.membersPage} aria-labelledby="members-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.sectionLabel}>Members</p>
          <h1 className={styles.title} id="members-title">
            GDGoC Sookmyung 6기 멤버들을 소개합니다.
          </h1>
        </div>

        {isLoading ? (
          <p className={styles.memberMessage}>멤버 목록을 불러오는 중입니다.</p>
        ) : null}

        {!isLoading && errorMessage ? (
          <p className={styles.memberMessage}>{errorMessage}</p>
        ) : null}

        <div className={styles.memberGrid}>
          {displayedMembers.map((member) => (
            <MemberCard
              member={member}
              imageSrc={getMemberImage(member)}
              key={member.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
