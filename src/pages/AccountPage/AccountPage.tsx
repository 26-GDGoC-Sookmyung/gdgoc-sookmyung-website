import styles from './AccountPage.module.css';

type AccountPageProps = {
  description: string;
  title: string;
};

export function AccountPage({ description, title }: AccountPageProps) {
  return (
    <section className={styles.accountPage}>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
