import { useEffect, useState } from 'react';

type Timer = {
  timeLeft: number;
  startTimer: () => void;
  clearTimer: () => void;
};

export function useTimer(duration: number): Timer {
  const [timeLeft, setTimeleft] = useState(0);
  const [invalidate, setInvalidate] = useState(0);

  const startTimer = (): void => {
    setTimeleft(duration);
    setInvalidate(invalidate + 1);
  };
  const clearTimer = (): void => {
    setTimeleft(0);
    setInvalidate(0);
  };

  useEffect(() => {
    if (invalidate > 0) {
      let end = new Date().getTime() + 31 * 1000;
      const id = setInterval(() => {
        if (new Date().getTime() < end) {
          setTimeleft(Math.floor((end - new Date().getTime()) / 1000));
        } else {
          setTimeleft(0);
          clearInterval(id);
        }
      }, 1000);
      return () => clearInterval(id);
    }
  }, [invalidate]);

  return { timeLeft, startTimer, clearTimer };
}
