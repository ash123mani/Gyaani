import { useEffect, useState } from "react";
import { QUIZ_QUES_GAP_MILLISECONDS } from "@qj/shared/config";

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
    countDownSecs = QUIZ_QUES_GAP_MILLISECONDS / 1000,
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
