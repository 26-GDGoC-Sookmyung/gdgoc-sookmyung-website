import styles from '../RecruitPage.module.css';

export function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <h2>더 자세한 궁금한 내용이 있다면?</h2>
      <a
        className={styles.contactButton}
        href="https://open.kakao.com/o/sKOMlKGi"
        rel="noopener noreferrer"
        target="_blank"
      >
        카카오톡 오픈채팅 문의하기
      </a>
    </section>
  );
}
