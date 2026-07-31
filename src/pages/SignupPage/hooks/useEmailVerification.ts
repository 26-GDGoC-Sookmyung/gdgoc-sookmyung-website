import { useEffect, useState } from 'react';

import { isValidEmail } from '@/utils/validation';

const VERIFICATION_DURATION_SECONDS = 180;
const VERIFICATION_DELAY_MS = 1200;

export type VerificationStatus = 'idle' | 'loading' | 'verified';

export function useEmailVerification() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hasRequestedVerification, setHasRequestedVerification] =
    useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    VERIFICATION_DURATION_SECONDS,
  );
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('idle');

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
    }, VERIFICATION_DELAY_MS);

    return () => {
      window.clearTimeout(verificationId);
    };
  }, [verificationStatus]);

  const updateEmail = (value: string) => {
    setEmail(value);
    setEmailError('');
    setHasRequestedVerification(false);
    setRemainingSeconds(VERIFICATION_DURATION_SECONDS);
    setVerificationStatus('idle');
  };

  const requestVerification = () => {
    if (!isValidEmail(email)) {
      setEmailError('이메일 형식으로 입력해 주세요.');
      return;
    }

    setEmailError('');
    setHasRequestedVerification(true);
    setRemainingSeconds(VERIFICATION_DURATION_SECONDS);
    setVerificationStatus('idle');
  };

  const verify = () => {
    if (verificationStatus === 'idle') {
      setVerificationStatus('loading');
    }
  };

  const formattedRemainingTime = `${Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(remainingSeconds % 60).toString().padStart(2, '0')}`;

  return {
    email,
    emailError,
    formattedRemainingTime,
    hasRequestedVerification,
    requestVerification,
    updateEmail,
    verificationStatus,
    verify,
  };
}
