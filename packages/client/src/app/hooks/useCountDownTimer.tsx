import { useEffect, useState } from "react";

import { START_GAME_COUNT_DOWN_SECS } from "@/app/quiz-room/components/StartQuizCountDown";

interface UseCountDownTimerProps {
  onCountDownStart?: () => void;
  onCountDownEnd?: () => void;
  countDownSecs?: number;
}

export function useCountDownTimer(
  props: UseCountDownTimerProps,
): [number, () => void] {
  const {
    onCountDownStart,
    onCountDownEnd,
    countDownSecs = START_GAME_COUNT_DOWN_SECS,
  } = props;
  const [startCountDownAt, setStartCountDownAt] = useState<number>(0);

  useEffect(() => {
    onCountDownStart?.();

    const interval = setInterval(() => {
      setStartCountDownAt((prev) => {
        if (prev + 1 === countDownSecs) {
          onCountDownEnd?.();
          clearInterval(interval);
        }
        return prev >= countDownSecs ? 0 : prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [props, countDownSecs]);

  function resetCountDownAt() {
    setStartCountDownAt(0);
  }

  return [startCountDownAt, resetCountDownAt];
}
