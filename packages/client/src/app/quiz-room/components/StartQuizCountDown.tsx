import {
  Box,
  CircularProgress,
  Heading,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { WAIT_TIME_BEFORE_QUIZ_START_SECS } from "@qj/shared/config";

import { useCountDownTimer } from "@/app/hooks";

interface StartQuizCountDownProps {
  onCountDownStart?: () => void;
  onCountDownEnd?: () => void;
}

export function StartQuizCountDown({
  onCountDownStart,
  onCountDownEnd,
}: StartQuizCountDownProps) {
  const [startCountDownAt] = useCountDownTimer({
    onCountDownStart,
    onCountDownEnd,
    countDownSecs: WAIT_TIME_BEFORE_QUIZ_START_SECS,
  });

  const progressPercent =
    (startCountDownAt / WAIT_TIME_BEFORE_QUIZ_START_SECS) * 100;
  const timeLeftToStartTheGame =
    WAIT_TIME_BEFORE_QUIZ_START_SECS - startCountDownAt;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="8"
    >
      <Heading
        as="h2"
        size="2xl"
        color="gray.400"
        textAlign="center"
        colorScheme="orange"
      >
        Game will start in {timeLeftToStartTheGame} seconds
      </Heading>
      <CircularProgress value={progressPercent} size="120px">
        <CircularProgressLabel fontSize="16px" fontWeight="bold">
          {timeLeftToStartTheGame} secs
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
