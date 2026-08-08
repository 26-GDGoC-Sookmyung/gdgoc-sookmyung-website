import type { FormEvent } from 'react';

import { FormButton, FormField, TextInput } from '@/components/common/Form';
import styles from './ForgotPasswordPage.module.css';

export function ForgotPasswordPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      className={styles.forgotPasswordPage}
      aria-labelledby="forgot-password-title"
    >
      <div className={styles.forgotPasswordInner}>
        <header className={styles.heading}>
          <h1 className={styles.title} id="forgot-password-title">
            비밀번호 찾기
          </h1>
          <p className={styles.description}>
            입력하신 인적사항으로 비밀번호를 찾을 수 있습니다.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField htmlFor="forgot-password-email" label="아이디" required>
            <TextInput
              autoComplete="email"
              id="forgot-password-email"
              name="email"
              placeholder="가입하신 이메일을 입력해 주세요."
              required
              type="email"
            />
          </FormField>

          <div className={styles.submitRow}>
            <FormButton
              className={styles.submitButton}
              type="submit"
              variant="primary"
            >
              인증코드 전송하기
            </FormButton>
          </div>
        </form>
      </div>
    </section>
  );
}
