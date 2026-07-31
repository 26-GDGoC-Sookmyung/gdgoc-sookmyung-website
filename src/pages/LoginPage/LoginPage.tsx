import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { FormButton, FormField, TextInput } from '@/components/common/Form';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles.loginPage} aria-labelledby="login-title">
      <div className={styles.loginInner}>
        <header className={styles.heading}>
          <h1 className={styles.title} id="login-title">
            로그인
          </h1>
          <p className={styles.description}>
            입력하신 이름, 학번, 비밀번호로 지원서를 다시 이어 작성할 수
            있습니다.
          </p>
        </header>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.fieldList}>
            <FormField htmlFor="login-id" label="아이디" required>
              <TextInput
                autoComplete="username"
                id="login-id"
                name="username"
                placeholder="회원가입 시 설정한 아이디를 입력해주세요."
                required
              />
            </FormField>

            <FormField htmlFor="login-password" label="비밀번호" required>
              <TextInput
                autoComplete="current-password"
                id="login-password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                required
                type="password"
              />
            </FormField>
          </div>

          <div className={styles.submitRow}>
            <FormButton
              className={styles.loginButton}
              type="submit"
              variant="primary"
            >
              로그인
            </FormButton>
          </div>
        </form>

        <nav className={styles.accountLinks} aria-label="계정 도움말">
          <Link to="/forgot-password">비밀번호 찾기</Link>
          <span aria-hidden="true">|</span>
          <Link to="/signup">회원가입</Link>
        </nav>
      </div>
    </section>
  );
}
