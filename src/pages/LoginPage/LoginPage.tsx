import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { accessTokenStorage } from '@/api/tokenStorage';
import { FormButton, FormField, TextInput } from '@/components/common/Form';
import { Modal } from '@/components/common/Modal/Modal';
import {
  getLoginErrorMessage,
  isInvalidCredentialsError,
  login,
} from './loginApi';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isLoginErrorModalOpen, setIsLoginErrorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError('');
    setIsLoginErrorModalOpen(false);
    setIsSubmitting(true);

    try {
      const tokens = await login({
        email: email.trim(),
        password,
      });

      if (!tokens) {
        setSubmitError('로그인 응답을 확인할 수 없습니다.');
        return;
      }

      accessTokenStorage.set(tokens.accessToken);
      navigate('/application/status', { replace: true });
    } catch (error) {
      if (isInvalidCredentialsError(error)) {
        setIsLoginErrorModalOpen(true);
      } else {
        setSubmitError(getLoginErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
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
                autoComplete="email"
                id="login-id"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitError('');
                }}
                placeholder="회원가입 시 설정한 아이디를 입력해주세요."
                required
                type="email"
                value={email}
              />
            </FormField>

            <FormField htmlFor="login-password" label="비밀번호" required>
              <TextInput
                autoComplete="current-password"
                id="login-password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setSubmitError('');
                }}
                placeholder="비밀번호를 입력해주세요."
                required
                type="password"
                value={password}
              />
            </FormField>
          </div>

          <div className={styles.submitRow}>
            {submitError ? (
              <p className={styles.submitError} role="alert">
                {submitError}
              </p>
            ) : null}
            <FormButton
              aria-label={isSubmitting ? '로그인 처리 중' : undefined}
              className={styles.loginButton}
              disabled={isSubmitting}
              type="submit"
              variant="primary"
            >
              {isSubmitting ? (
                <span className={styles.loadingIndicator} aria-hidden="true" />
              ) : (
                '로그인'
              )}
            </FormButton>
          </div>
        </form>

        <nav className={styles.accountLinks} aria-label="계정 도움말">
          <Link to="/forgot-password">비밀번호 찾기</Link>
          <span aria-hidden="true">|</span>
          <Link to="/signup">회원가입</Link>
        </nav>
      </div>

      {isLoginErrorModalOpen ? (
        <Modal
          ariaLabel="로그인 실패"
          role="alertdialog"
          title={
            <>
              <span>아이디 또는</span>
              <span>비밀번호가 맞지 않습니다.</span>
              <span>다시 시도해주세요.</span>
            </>
          }
          onClose={() => setIsLoginErrorModalOpen(false)}
        />
      ) : null}
    </section>
  );
}
