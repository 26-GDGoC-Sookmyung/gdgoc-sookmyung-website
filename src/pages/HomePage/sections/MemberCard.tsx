import { useState } from 'react';

import memberCardIcon from '@/assets/icons/home/member-card-icon.png';
import memberCardBack from '@/assets/images/home/member-card-back.png';
import memberCardBackground from '@/assets/images/home/member-card-background.png';

import styles from '../HomePage.module.css';
import type { MemberTeam } from './homeData';

export function MemberCard({ team }: { team: MemberTeam }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const descriptionId = `member-${team.id}-description`;
  const toggleCard = () => setIsFlipped((current) => !current);

  return (
    <button
      className={`${styles.memberCard} ${isFlipped ? styles.memberCardFlipped : ''}`}
      type="button"
      aria-label={`${team.name} 카드 ${isFlipped ? '앞면 보기' : '뒷면 보기'}`}
      aria-describedby={isFlipped ? descriptionId : undefined}
      aria-pressed={isFlipped}
      onClick={toggleCard}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCard();
        }
      }}
    >
      <span className={styles.memberCardInner}>
        <span
          className={`${styles.memberCardFace} ${styles.memberCardFront}`}
          aria-hidden={isFlipped}
        >
          <img
            className={styles.memberCardBackground}
            src={memberCardBackground}
            alt=""
          />
          <img className={styles.memberCardIcon} src={memberCardIcon} alt="" />
          <span className={styles.memberCardName}>{team.name}</span>
        </span>

        <span
          className={`${styles.memberCardFace} ${styles.memberCardBack}`}
          aria-hidden={!isFlipped}
        >
          <img
            className={styles.memberCardBackBackground}
            src={memberCardBack}
            alt=""
          />
          <ul className={styles.memberCardDetails} id={descriptionId}>
            {team.descriptions.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>
        </span>
      </span>
    </button>
  );
}
