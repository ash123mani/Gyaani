import { useEffect, useState } from "react";

interface UseCountDownTimerProps {
  onCountDownStart?: () => void;
  onCountDownEnd?: () => void;
  countDownSecs: number;
}

export function useCountDownTimer(
  props: UseCountDownTimerProps,
): [number, (timeLeft: number) => void] {
  const { onCountDownEnd, countDownSecs } = props;
  const [timeLeft, setTimeLeft] = useState(countDownSecs);

  useEffect(() => {
    if (timeLeft < 0) {
      onCountDownEnd?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  function resetCountDownAt(timeLeft: number = 0) {
    setTimeLeft(timeLeft);
  }

  return [timeLeft, resetCountDownAt];
}
