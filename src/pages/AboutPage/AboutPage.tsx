import {
  arrowRight,
  arrowUp,
  blueCircle,
  blueSemicircle,
  blueTriangle,
  dash,
  greenCircle,
  greenSemicircle,
  leftRing,
  orangeCircle,
  orangeDot,
  orangeTriangle,
  star,
  targetLine,
  targetRing,
  underline,
  whiteRing,
  xLineA,
  xLineB,
  yellowPanel,
} from '@/assets/icons/about';

import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <section className={styles.aboutHero} aria-labelledby="about-page-title">
      <div className={styles.artboard}>
        <h1 className={styles.title} id="about-page-title">
          <span className={styles.google}>Google</span>
          <span className={styles.developer}>Developer</span>
          <span className={styles.groups}>Groups on</span>
          <span className={styles.campus}>Campus</span>
        </h1>

        <img
          className={styles.orangeCircle}
          src={orangeCircle}
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.leftRing}
          src={leftRing}
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.arrowRight}
          src={arrowRight}
          alt=""
          aria-hidden="true"
        />

        <img
          className={styles.arrowUp}
          src={arrowUp}
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.blueCircle}
          src={blueCircle}
          alt=""
          aria-hidden="true"
        />
        <span className={styles.cross} aria-hidden="true">
          <img src={xLineA} alt="" />
          <img src={xLineB} alt="" />
        </span>
        <img
          className={styles.greenCircle}
          src={greenCircle}
          alt=""
          aria-hidden="true"
        />

        <img
          className={styles.greenSemicircle}
          src={greenSemicircle}
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.blueSemicircle}
          src={blueSemicircle}
          alt=""
          aria-hidden="true"
        />

        <span className={styles.target} aria-hidden="true">
          <span className={styles.yellowPanel}>
            <img src={yellowPanel} alt="" />
          </span>
          <img className={styles.whiteRing} src={whiteRing} alt="" />
          <img className={styles.orangeDot} src={orangeDot} alt="" />
          <img className={styles.targetRing} src={targetRing} alt="" />
          <img className={styles.targetLine} src={targetLine} alt="" />
          <img className={styles.targetDashOne} src={dash} alt="" />
          <img className={styles.targetDashTwo} src={dash} alt="" />
        </span>

        <img
          className={styles.underline}
          src={underline}
          alt=""
          aria-hidden="true"
        />
        <img className={styles.star} src={star} alt="" aria-hidden="true" />
        <img
          className={styles.orangeTriangle}
          src={orangeTriangle}
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.blueTriangle}
          src={blueTriangle}
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
