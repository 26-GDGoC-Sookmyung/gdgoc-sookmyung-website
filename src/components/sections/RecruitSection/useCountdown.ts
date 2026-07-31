import { useEffect, useState } from 'react';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const defaultCountdown: Countdown = {
  days: 12,
  hours: 5,
  minutes: 30,
  seconds: 23,
};

function getCountdownTestSeconds() {
  const value = new URLSearchParams(window.location.search).get(
    'countdownTest',
  );
  const seconds = Number(value);

  return value !== null && Number.isFinite(seconds) && seconds >= 0
    ? Math.floor(seconds)
    : null;
}

function splitCountdown(totalMilliseconds: number): Countdown {
  const totalSeconds = Math.ceil(totalMilliseconds / 1000);

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
  const [countdownTestSeconds] = useState(getCountdownTestSeconds);
  const [countdown, setCountdown] = useState(defaultCountdown);

  useEffect(() => {
    if (countdownTestSeconds === null) {
      return;
    }

    const deadline = Date.now() + countdownTestSeconds * 1000;
    const updateCountdown = () => {
      setCountdown(splitCountdown(Math.max(0, deadline - Date.now())));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 250);

    return () => window.clearInterval(intervalId);
  }, [countdownTestSeconds]);

  return {
    text: formatCountdown(countdown),
    label: `${countdown.days}일 ${countdown.hours}시간 ${countdown.minutes}분 ${countdown.seconds}초`,
  };
}
