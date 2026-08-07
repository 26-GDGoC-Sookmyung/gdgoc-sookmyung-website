import { useEffect, useState } from 'react';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const MEMBER_RECRUITMENT_DEADLINE = '2026-08-24T23:59:59+09:00';

function getCountdownTestSeconds() {
  const value = new URLSearchParams(window.location.search).get(
    'countdownTest',
  );
  const seconds = Number(value);

  return value !== null && Number.isFinite(seconds) && seconds >= 0
    ? Math.floor(seconds)
    : null;
}

function getCountdownDeadline() {
  const countdownTestSeconds = getCountdownTestSeconds();

  return countdownTestSeconds === null
    ? new Date(MEMBER_RECRUITMENT_DEADLINE).getTime()
    : Date.now() + countdownTestSeconds * 1000;
}

function splitCountdown(totalMilliseconds: number): Countdown {
  const safeMilliseconds = Number.isFinite(totalMilliseconds)
    ? Math.max(0, totalMilliseconds)
    : 0;
  const totalSeconds = Math.ceil(safeMilliseconds / 1000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatCountdown(value: Countdown) {
  return [value.days, value.hours, value.minutes, value.seconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');
}

export function useCountdown() {
  const [deadline] = useState(getCountdownDeadline);
  const [countdown, setCountdown] = useState(() =>
    splitCountdown(deadline - Date.now()),
  );

  useEffect(() => {
    const updateCountdown = () => {
      const difference = deadline - Date.now();
      const remainingMilliseconds = Number.isFinite(difference)
        ? Math.max(0, difference)
        : 0;

      setCountdown(splitCountdown(remainingMilliseconds));

      return remainingMilliseconds === 0;
    };

    if (updateCountdown()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (updateCountdown()) {
        window.clearInterval(intervalId);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [deadline]);

  const isExpired = Object.values(countdown).every((unit) => unit === 0);

  return {
    isExpired,
    text: isExpired ? '0:00:00:00' : formatCountdown(countdown),
    label: isExpired
      ? '모집이 마감되었습니다.'
      : `${countdown.days}일 ${countdown.hours}시간 ${countdown.minutes}분 ${countdown.seconds}초 남았습니다.`,
  };
}
