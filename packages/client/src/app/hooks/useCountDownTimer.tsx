import { useEffect, useState } from "react";

import { START_GAME_COUNT_DOWN_SECS } from "@/app/quiz-room/components/StartQuizCountDown";

interface UseCountDownTimerProps {
  onCountDownStart?: () => void;
  onCountDownEnd?: () => void;
}

export function useCountDownTimer({
  onCountDownStart,
  onCountDownEnd,
}: UseCountDownTimerProps) {
  const [startCountDownAt, setStartCountDownAt] = useState<number>(0);

  useEffect(() => {
    onCountDownStart?.();

    const interval = setInterval(() => {
      setStartCountDownAt((prev) => {
        if (prev + 1 === START_GAME_COUNT_DOWN_SECS) {
          onCountDownEnd?.();
          clearInterval(interval);
        }
        return prev >= START_GAME_COUNT_DOWN_SECS ? 0 : prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return [startCountDownAt, setStartCountDownAt];
}
