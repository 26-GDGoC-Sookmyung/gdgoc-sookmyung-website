import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import passwordVisibilityIcon from '@/assets/icons/common/password-visibility.svg';
import { FormButton, FormField, TextInput } from '@/components/common/Form';
import { Modal } from '@/components/common/Modal/Modal';
import { useBeforeUnloadWarning } from './hooks/useBeforeUnloadWarning';
import { useEmailVerification } from './hooks/useEmailVerification';
import {
  DUPLICATE_EMAIL_ERROR_MESSAGE,
  getSignupErrorMessage,
  signup as signupAccount,
} from './signupApi';
import styles from './SignupPage.module.css';

type SignupFormErrors = Partial<
  Record<'name' | 'password' | 'passwordConfirmation', string>
>;

export function SignupPage() {
  const navigate = useNavigate();
  const {
    email,
    emailError,
    formattedRemainingTime,
    hasRequestedVerification,
    isVerificationExpired,
    requestStatus,
    requestVerification,
    updateEmail,
    updateVerificationCode,
    verificationCode,
    verificationError,
    verificationStatus,
    verify,
  } = useEmailVerification();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [signupAlertMessage, setSignupAlertMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  useBeforeUnloadWarning();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: SignupFormErrors = {};

    if (!name.trim()) {
      nextErrors.name = '이름을 입력해 주세요.';
    }

    if (password.length < 8 || password.length > 20) {
      nextErrors.password = '비밀번호는 8자 이상 20자 이하로 입력해 주세요.';
    }

    if (password !== passwordConfirmation) {
      nextErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
    }

    setFormErrors(nextErrors);
    setSubmitError('');
    setSignupAlertMessage('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (verificationStatus !== 'verified') {
      setSubmitError('이메일 인증을 완료해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signupAccount({
        email: email.trim(),
        password,
        name: name.trim(),
      });
      navigate('/login', { replace: true });
    } catch (error) {
      const errorMessage = getSignupErrorMessage(
        error,
        '회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      );

      if (errorMessage === DUPLICATE_EMAIL_ERROR_MESSAGE) {
        setSignupAlertMessage(errorMessage);
      } else {
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <FormField
                errorMessage={formErrors.name}
                htmlFor="signup-name"
                label="이름"
                required
              >
                <TextInput
                  autoComplete="name"
                  hasError={Boolean(formErrors.name)}
                  id="signup-name"
                  name="name"
                  onChange={(event) => {
                    setName(event.target.value);
                    setFormErrors((errors) => ({ ...errors, name: '' }));
                  }}
                  placeholder="이름을 입력해주세요."
                  required
                  value={name}
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
                      disabled={
                        requestStatus === 'loading' ||
                        verificationStatus === 'loading'
                      }
                      hasError={Boolean(emailError)}
                      id="signup-email"
                      name="email"
                      onChange={(event) => updateEmail(event.target.value)}
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
                    disabled={
                      requestStatus === 'loading' ||
                      verificationStatus === 'verified'
                    }
                    onClick={requestVerification}
                    type="button"
                  >
                    {requestStatus === 'loading'
                      ? '전송 중...'
                      : '인증번호 받기'}
                  </button>
                </div>
              </FormField>
            </div>

            <div className={styles.verificationField}>
              <FormField
                errorMessage={verificationError}
                htmlFor="signup-verification"
                label="인증"
                required
              >
                <div className={styles.verificationContent}>
                  <div className={styles.actionRow}>
                    <div className={styles.verificationControl}>
                      <TextInput
                        aria-describedby="signup-verification-help"
                        autoComplete="one-time-code"
                        disabled={
                          !hasRequestedVerification ||
                          verificationStatus !== 'idle'
                        }
                        hasError={Boolean(verificationError)}
                        id="signup-verification"
                        inputMode="numeric"
                        maxLength={6}
                        name="verificationCode"
                        onChange={(event) =>
                          updateVerificationCode(event.target.value)
                        }
                        placeholder="인증번호를 입력해주세요."
                        required
                        value={verificationCode}
                      />
                      {hasRequestedVerification ? (
                        <span className={styles.verificationTimer}>
                          {formattedRemainingTime}
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
                      disabled={
                        !hasRequestedVerification ||
                        isVerificationExpired ||
                        verificationStatus !== 'idle'
                      }
                      onClick={verify}
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
                      <button
                        disabled={
                          requestStatus === 'loading' ||
                          verificationStatus === 'verified'
                        }
                        onClick={requestVerification}
                        type="button"
                      >
                        재요청
                      </button>
                    </li>
                  </ul>
                </div>
              </FormField>
            </div>

            <div className={styles.fullField}>
              <FormField
                errorMessage={formErrors.password}
                htmlFor="signup-password"
                label="비밀번호"
                required
              >
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    hasError={Boolean(formErrors.password)}
                    id="signup-password"
                    maxLength={20}
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setFormErrors((errors) => ({ ...errors, password: '' }));
                    }}
                    placeholder="비밀번호를 입력해주세요."
                    required
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
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
                errorMessage={formErrors.passwordConfirmation}
                htmlFor="signup-password-confirmation"
                label="비밀번호 확인"
                required
              >
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    hasError={Boolean(formErrors.passwordConfirmation)}
                    id="signup-password-confirmation"
                    maxLength={20}
                    name="passwordConfirmation"
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                      setFormErrors((errors) => ({
                        ...errors,
                        passwordConfirmation: '',
                      }));
                    }}
                    required
                    type={isPasswordConfirmationVisible ? 'text' : 'password'}
                    value={passwordConfirmation}
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
            {submitError ? (
              <p className={styles.submitError} role="alert">
                {submitError}
              </p>
            ) : null}
            <FormButton
              aria-label={isSubmitting ? '회원가입 처리 중' : undefined}
              className={styles.signupButton}
              disabled={isSubmitting}
              type="submit"
              variant="primary"
            >
              {isSubmitting ? (
                <span className={styles.loadingIndicator} aria-hidden="true" />
              ) : (
                '회원가입'
              )}
            </FormButton>
          </div>
        </form>
      </div>

      {signupAlertMessage ? (
        <Modal
          ariaLabel="회원가입 오류"
          role="alertdialog"
          title={<span>{signupAlertMessage}</span>}
          onClose={() => setSignupAlertMessage('')}
        />
      ) : null}
    </section>
  );
}
