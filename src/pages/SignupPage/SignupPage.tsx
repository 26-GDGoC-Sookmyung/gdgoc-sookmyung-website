import { useEffect, useState, type FormEvent } from 'react';

import passwordVisibilityIcon from '@/assets/icons/common/password-visibility.svg';
import { FormButton, FormField, TextInput } from '@/components/common/Form';
import styles from './SignupPage.module.css';

type VerificationStatus = 'idle' | 'loading' | 'verified';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hasRequestedVerification, setHasRequestedVerification] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(180);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('idle');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (
      !hasRequestedVerification ||
      remainingSeconds === 0 ||
      verificationStatus === 'verified'
    ) {
      return;
    }

    const timerId = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [hasRequestedVerification, remainingSeconds, verificationStatus]);

  useEffect(() => {
    if (verificationStatus !== 'loading') {
      return;
    }

    const verificationId = window.setTimeout(() => {
      setVerificationStatus('verified');
    }, 1200);

    return () => {
      window.clearTimeout(verificationId);
    };
  }, [verificationStatus]);

  const handleRequestVerification = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!isValidEmail) {
      setEmailError('이메일 형식으로 입력해 주세요.');
      return;
    }

    setEmailError('');
    setHasRequestedVerification(true);
    setRemainingSeconds(180);
    setVerificationStatus('idle');
  };

  const handleVerify = () => {
    setVerificationStatus('loading');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const verificationTimer = `${Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(remainingSeconds % 60).toString().padStart(2, '0')}`;

  return (
    <section className={styles.signupPage} aria-labelledby="signup-title">
      <div className={styles.signupInner}>
        <header className={styles.heading}>
          <h1 className={styles.title} id="signup-title">
            회원가입
          </h1>
          <p className={styles.description}>
            입력하신 이름, 학번, 비밀번호로 지원서를 다시 이어 작성할 수
            있습니다.
          </p>
        </header>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.fieldList}>
            <div className={styles.fullField}>
              <FormField htmlFor="signup-name" label="이름" required>
                <TextInput
                  autoComplete="name"
                  id="signup-name"
                  name="name"
                  placeholder="이름을 입력해주세요."
                  required
                />
              </FormField>
            </div>

            <div className={styles.emailField}>
              <FormField
                errorMessage={emailError}
                htmlFor="signup-email"
                label="아이디"
                required
              >
                <div className={styles.actionRow}>
                  <div className={styles.emailControl}>
                    <TextInput
                      aria-describedby="signup-email-example"
                      autoComplete="email"
                      hasError={Boolean(emailError)}
                      id="signup-email"
                      name="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setEmailError('');
                        setHasRequestedVerification(false);
                        setRemainingSeconds(180);
                        setVerificationStatus('idle');
                      }}
                      placeholder="이메일 형식으로 입력해주세요."
                      required
                      type="email"
                      value={email}
                    />
                    <span
                      className={styles.emailExample}
                      id="signup-email-example"
                    >
                      (예 : ktyjj0306@sookmyung.ac.kr)
                    </span>
                  </div>
                  <button
                    className={styles.sideButton}
                    onClick={handleRequestVerification}
                    type="button"
                  >
                    인증번호 받기
                  </button>
                </div>
              </FormField>
            </div>

            <div className={styles.verificationField}>
              <FormField htmlFor="signup-verification" label="인증" required>
                <div className={styles.verificationContent}>
                  <div className={styles.actionRow}>
                    <div className={styles.verificationControl}>
                      <TextInput
                        aria-describedby="signup-verification-help"
                        autoComplete="one-time-code"
                        id="signup-verification"
                        inputMode="numeric"
                        name="verificationCode"
                        placeholder="인증번호를 입력해주세요."
                        required
                      />
                      {hasRequestedVerification ? (
                        <span className={styles.verificationTimer}>
                          {verificationTimer}
                        </span>
                      ) : null}
                    </div>
                    <button
                      aria-label={
                        verificationStatus === 'loading' ? '인증 중' : undefined
                      }
                      className={`${styles.sideButton} ${
                        verificationStatus === 'verified'
                          ? styles.verifiedButton
                          : ''
                      }`}
                      disabled={verificationStatus !== 'idle'}
                      onClick={handleVerify}
                      type="button"
                    >
                      {verificationStatus === 'loading' ? (
                        <span
                          className={styles.loadingIndicator}
                          aria-hidden="true"
                        />
                      ) : (
                        <span aria-live="polite">
                          {verificationStatus === 'verified'
                            ? '인증 완료'
                            : '인증하기'}
                        </span>
                      )}
                    </button>
                  </div>

                  <ul
                    className={styles.verificationHelp}
                    id="signup-verification-help"
                  >
                    <li>인증번호는 3분 이내에 입력해주세요.</li>
                    <li>
                      인증번호를 받지 못하셨나요?{' '}
                      <button onClick={handleRequestVerification} type="button">
                        재요청
                      </button>
                    </li>
                  </ul>
                </div>
              </FormField>
            </div>

            <div className={styles.fullField}>
              <FormField htmlFor="signup-password" label="비밀번호" required>
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    id="signup-password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    required
                    type={isPasswordVisible ? 'text' : 'password'}
                  />
                  <button
                    aria-label={
                      isPasswordVisible
                        ? '비밀번호 숨기기'
                        : '비밀번호 표시하기'
                    }
                    className={styles.visibilityButton}
                    onClick={() =>
                      setIsPasswordVisible((isVisible) => !isVisible)
                    }
                    type="button"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      src={passwordVisibilityIcon}
                    />
                  </button>
                </div>
              </FormField>
            </div>

            <div className={styles.fullField}>
              <FormField
                htmlFor="signup-password-confirmation"
                label="비밀번호 확인"
                required
              >
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    id="signup-password-confirmation"
                    name="passwordConfirmation"
                    required
                    type={isPasswordConfirmationVisible ? 'text' : 'password'}
                  />
                  <button
                    aria-label={
                      isPasswordConfirmationVisible
                        ? '비밀번호 확인 숨기기'
                        : '비밀번호 확인 표시하기'
                    }
                    className={styles.visibilityButton}
                    onClick={() =>
                      setIsPasswordConfirmationVisible(
                        (isVisible) => !isVisible,
                      )
                    }
                    type="button"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      src={passwordVisibilityIcon}
                    />
                  </button>
                </div>
              </FormField>
            </div>
          </div>

          <div className={styles.submitRow}>
            <FormButton
              className={styles.signupButton}
              type="submit"
              variant="primary"
            >
              회원가입
            </FormButton>
          </div>
        </form>
      </div>
    </section>
  );
}
