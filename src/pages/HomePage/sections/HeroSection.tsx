import heroGdgImage from '@/assets/images/home/hero-gdg.png';

import styles from '../HomePage.module.css';

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle} id="home-title">
          <span>Build.</span>
          <span>Connect.</span>
          <span>Grow.</span>
        </h1>

        <div className={styles.heroVisual} aria-hidden="true">
          <img className={styles.heroImage} src={heroGdgImage} alt="" />
        </div>
      </div>
    </section>
  );
}
