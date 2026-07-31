import { Link } from 'react-router-dom';

import aboutArrowIcon from '@/assets/icons/home/about-arrow.svg';

import styles from '../HomePage.module.css';

export function AboutSection() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.aboutInner}>
        <div className={styles.aboutHeading}>
          <p className={styles.sectionLabel}>ABOUT US</p>
          <h2 className={styles.sectionTitle} id="about-title">
            Google Developer Group on Campus를 소개합니다.
          </h2>
          <p className={styles.sectionDescription}>
            GDGoC(Google Developer Group on Campus)는 Google Developers가
            지원하는 대학교 개발자 커뮤니티입니다.
          </p>
        </div>

        <div className={styles.aboutCards}>
          <article className={`${styles.aboutCard} ${styles.communityCard}`}>
            <h3 className={styles.cardTitle}>Community</h3>
            <div className={styles.cardDescription}>
              <p>함께 배우고 성장하는 개발자 커뮤니티</p>
              <p>
                스터디, 프로젝트, 세미나를 통해
                <br />
                혼자가 아닌 함께 성장합니다.
              </p>
            </div>
            <Link className={styles.aboutLink} to="/about">
              <span>더 알아보기</span>
              <img src={aboutArrowIcon} alt="" aria-hidden="true" />
            </Link>
          </article>

          <div className={styles.aboutCardColumn}>
            <article className={`${styles.aboutCard} ${styles.activitiesCard}`}>
              <h3 className={styles.cardTitle}>Activities</h3>
              <p className={styles.cardDescription}>
                정기 세미나 · 기술 스터디 · 프로젝트
                <br />
                AI/ML, FE, BE 등 관심 기술을 함께 탐구합니다.
              </p>
            </article>

            <article className={`${styles.aboutCard} ${styles.networkCard}`}>
              <h3 className={styles.cardTitle}>Network</h3>
              <p className={styles.cardDescription}>
                전국 GDG 및 다양한 개발자들과의 교류
                <br />
                연합 세션, 연합 프로젝트, 해커톤 등을 통한 네트워크 확장 기회
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
