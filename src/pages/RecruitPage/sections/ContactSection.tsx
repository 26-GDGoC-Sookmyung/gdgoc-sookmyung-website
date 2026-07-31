import styles from '../RecruitPage.module.css';

export function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <h2>더 자세한 궁금한 내용이 있다면?</h2>
      <button className={styles.contactButton} type="button">
        카카오톡 오픈채팅 문의하기
      </button>
    </section>
  );
}
