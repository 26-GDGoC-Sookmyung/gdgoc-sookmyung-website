import { useEffect, useState } from 'react';

import {
  getSignupErrorMessage,
  sendVerificationCode,
  verifyEmailCode,
} from '../signupApi';
import { isValidEmail } from '@/utils/validation';

const VERIFICATION_DURATION_SECONDS = 180;

export type VerificationStatus = 'idle' | 'loading' | 'verified';
export type VerificationRequestStatus = 'idle' | 'loading';

export function useEmailVerification() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [hasRequestedVerification, setHasRequestedVerification] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    VERIFICATION_DURATION_SECONDS,
  );
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('idle');
  const [requestStatus, setRequestStatus] =
    useState<VerificationRequestStatus>('idle');

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

  const updateEmail = (value: string) => {
    setEmail(value);
    setEmailError('');
    setVerificationCode('');
    setVerificationError('');
    setHasRequestedVerification(false);
    setRemainingSeconds(VERIFICATION_DURATION_SECONDS);
    setVerificationStatus('idle');
    setRequestStatus('idle');
  };

  const updateVerificationCode = (value: string) => {
    setVerificationCode(value.replace(/\D/g, '').slice(0, 6));
    setVerificationError('');
  };

  const requestVerification = async () => {
    if (!isValidEmail(email)) {
      setEmailError('이메일 형식으로 입력해 주세요.');
      return;
    }

    setEmailError('');
    setVerificationError('');
    setRequestStatus('loading');

    try {
      await sendVerificationCode(email.trim());
      setVerificationCode('');
      setHasRequestedVerification(true);
      setRemainingSeconds(VERIFICATION_DURATION_SECONDS);
      setVerificationStatus('idle');
    } catch (error) {
      setEmailError(
        getSignupErrorMessage(
          error,
          '인증번호를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.',
        ),
      );
    } finally {
      setRequestStatus('idle');
    }
  };

  const verify = async () => {
    if (!hasRequestedVerification) {
      setVerificationError('인증번호를 먼저 요청해 주세요.');
      return;
    }

    if (remainingSeconds === 0) {
      setVerificationError('인증 시간이 만료되었습니다. 다시 요청해 주세요.');
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setVerificationError('6자리 인증번호를 입력해 주세요.');
      return;
    }

    setVerificationError('');
    setVerificationStatus('loading');

    try {
      await verifyEmailCode(email.trim(), verificationCode);
      setVerificationStatus('verified');
    } catch (error) {
      setVerificationStatus('idle');
      setVerificationError(
        getSignupErrorMessage(
          error,
          '인증번호를 확인하지 못했습니다. 다시 시도해 주세요.',
        ),
      );
    }
  };

  const formattedRemainingTime = `${Math.floor(remainingSeconds / 60)}:${(
    remainingSeconds % 60
  )
    .toString()
    .padStart(2, '0')}`;

  return {
    email,
    emailError,
    formattedRemainingTime,
    hasRequestedVerification,
    isVerificationExpired: remainingSeconds === 0,
    requestStatus,
    requestVerification,
    updateEmail,
    updateVerificationCode,
    verificationCode,
    verificationError,
    verificationStatus,
    verify,
  };
}
