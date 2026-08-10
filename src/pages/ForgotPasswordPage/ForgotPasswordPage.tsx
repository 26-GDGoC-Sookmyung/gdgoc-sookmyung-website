import { useEffect, useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useBlocker, useNavigate } from 'react-router-dom';

import { FormButton, FormField, TextInput } from '@/components/common/Form';
import { Modal } from '@/components/common/Modal/Modal';
import { useBeforeUnloadWarning } from '@/pages/SignupPage/hooks/useBeforeUnloadWarning';
import { isValidEmail } from '@/utils/validation';
import {
  getForgotPasswordErrorMessage,
  resetPassword,
  sendPasswordResetVerificationCode,
} from './forgotPasswordApi';
import styles from './ForgotPasswordPage.module.css';

type ForgotPasswordStep = 'email' | 'reset';
type ResetFormErrors = Partial<
  Record<'verificationCode' | 'password' | 'passwordConfirmation', string>
>;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resetFormErrors, setResetFormErrors] = useState<ResetFormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldBlockNavigation = step === 'reset' && !isSuccessModalOpen;
  const blocker = useBlocker(shouldBlockNavigation);

  useBeforeUnloadWarning(shouldBlockNavigation);

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      return;
    }

    const shouldLeave = window.confirm(
      '입력 중인 내용이 사라집니다. 페이지를 이동하시겠습니까?',
    );

    if (shouldLeave) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker]);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError('이메일 형식으로 입력해 주세요.');
      return;
    }

    setEmailError('');
    setErrorModalMessage('');
    setIsSubmitting(true);

    try {
      await sendPasswordResetVerificationCode(email.trim());
      setStep('reset');
    } catch (error) {
      setErrorModalMessage(
        getForgotPasswordErrorMessage(
          error,
          '인증코드를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.',
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ResetFormErrors = {};

    if (!/^\d{6}$/.test(verificationCode)) {
      nextErrors.verificationCode = '6자리 인증코드를 입력해 주세요.';
    }

    if (password.length < 8 || password.length > 20) {
      nextErrors.password = '비밀번호는 8자 이상 20자 이하로 입력해 주세요.';
    }

    if (password !== passwordConfirmation) {
      nextErrors.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
    }

    setResetFormErrors(nextErrors);
    setErrorModalMessage('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        code: verificationCode,
        email: email.trim(),
        newPassword: password,
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      setErrorModalMessage(
        getForgotPasswordErrorMessage(
          error,
          '비밀번호를 재설정하지 못했습니다. 잠시 후 다시 시도해 주세요.',
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
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

        {step === 'email' ? (
          <form className={styles.form} onSubmit={handleEmailSubmit}>
            <FormField
              errorMessage={emailError}
              htmlFor="forgot-password-email"
              label="아이디"
              required
            >
              <TextInput
                autoComplete="email"
                disabled={isSubmitting}
                hasError={Boolean(emailError)}
                id="forgot-password-email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError('');
                }}
                placeholder="가입하신 이메일을 입력해 주세요."
                required
                type="email"
                value={email}
              />
            </FormField>

            <div className={styles.submitRow}>
              <FormButton
                aria-label={isSubmitting ? '인증코드 전송 중' : undefined}
                className={styles.submitButton}
                disabled={isSubmitting}
                type="submit"
                variant="primary"
              >
                {isSubmitting ? (
                  <span
                    className={styles.loadingIndicator}
                    aria-hidden="true"
                  />
                ) : (
                  '인증코드 전송하기'
                )}
              </FormButton>
            </div>
          </form>
        ) : (
          <form className={styles.resetForm} onSubmit={handleResetSubmit}>
            <div className={styles.resetFieldList}>
              <FormField
                errorMessage={resetFormErrors.verificationCode}
                htmlFor="forgot-password-code"
                label="인증코드"
                required
              >
                <TextInput
                  autoComplete="one-time-code"
                  disabled={isSubmitting}
                  hasError={Boolean(resetFormErrors.verificationCode)}
                  id="forgot-password-code"
                  inputMode="numeric"
                  maxLength={6}
                  name="verificationCode"
                  onChange={(event) => {
                    setVerificationCode(
                      event.target.value.replace(/\D/g, '').slice(0, 6),
                    );
                    setResetFormErrors((errors) => ({
                      ...errors,
                      verificationCode: '',
                    }));
                  }}
                  placeholder="이메일로 전송된 인증코드를 입력해주세요."
                  required
                  value={verificationCode}
                />
              </FormField>

              <FormField
                errorMessage={resetFormErrors.password}
                htmlFor="forgot-password-new-password"
                label="새 비밀번호"
                required
              >
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    hasError={Boolean(resetFormErrors.password)}
                    id="forgot-password-new-password"
                    maxLength={20}
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setResetFormErrors((errors) => ({
                        ...errors,
                        password: '',
                      }));
                    }}
                    placeholder="비밀번호를 입력해주세요."
                    required
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                  />
                  <button
                    aria-label={
                      isPasswordVisible
                        ? '새 비밀번호 숨기기'
                        : '새 비밀번호 표시하기'
                    }
                    className={styles.visibilityButton}
                    disabled={isSubmitting}
                    onClick={() =>
                      setIsPasswordVisible((isVisible) => !isVisible)
                    }
                    type="button"
                  >
                    {isPasswordVisible ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormField>

              <FormField
                errorMessage={resetFormErrors.passwordConfirmation}
                htmlFor="forgot-password-confirmation"
                label="새 비밀번호 확인"
                required
              >
                <div className={styles.passwordControl}>
                  <TextInput
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    hasError={Boolean(resetFormErrors.passwordConfirmation)}
                    id="forgot-password-confirmation"
                    maxLength={20}
                    name="passwordConfirmation"
                    onChange={(event) => {
                      setPasswordConfirmation(event.target.value);
                      setResetFormErrors((errors) => ({
                        ...errors,
                        passwordConfirmation: '',
                      }));
                    }}
                    placeholder="비밀번호를 다시 한 번 입력해주세요."
                    required
                    type={
                      isPasswordConfirmationVisible ? 'text' : 'password'
                    }
                    value={passwordConfirmation}
                  />
                  <button
                    aria-label={
                      isPasswordConfirmationVisible
                        ? '새 비밀번호 확인 숨기기'
                        : '새 비밀번호 확인 표시하기'
                    }
                    className={styles.visibilityButton}
                    disabled={isSubmitting}
                    onClick={() =>
                      setIsPasswordConfirmationVisible(
                        (isVisible) => !isVisible,
                      )
                    }
                    type="button"
                  >
                    {isPasswordConfirmationVisible ? (
                      <EyeOff aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormField>
            </div>

            <div className={styles.resetSubmitRow}>
              <FormButton
                aria-label={isSubmitting ? '비밀번호 재설정 중' : undefined}
                className={styles.submitButton}
                disabled={isSubmitting}
                type="submit"
                variant="primary"
              >
                {isSubmitting ? (
                  <span
                    className={styles.loadingIndicator}
                    aria-hidden="true"
                  />
                ) : (
                  '확인'
                )}
              </FormButton>
            </div>
          </form>
        )}
      </div>

      {errorModalMessage ? (
        <Modal
          ariaLabel="비밀번호 찾기 오류"
          role="alertdialog"
          title={<span>{errorModalMessage}</span>}
          onClose={() => setErrorModalMessage('')}
        />
      ) : null}

      {isSuccessModalOpen ? (
        <Modal
          ariaLabel="비밀번호 변경 완료"
          role="alertdialog"
          title={<span>비밀번호 변경이 완료되었습니다.</span>}
          onClose={() => navigate('/login', { replace: true })}
        />
      ) : null}
    </section>
  );
}
